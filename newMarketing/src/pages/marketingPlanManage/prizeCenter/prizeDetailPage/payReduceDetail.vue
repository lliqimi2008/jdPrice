<template>
  <div class="coupon-detail">
    <div class="pub-sm-title clear">
      <h3 class="fl">支付立减奖品详情</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="prizeIsAllowEdit">编辑</el-button>
      </el-row>
    </div>
    <div class="pv bg-pad-border">
      <el-row>
        <el-col :span="12"><strong>奖品ID：</strong>{{prizeId}}</el-col>
        <el-col :span="9"><strong>奖品描述：</strong>{{payReduceForm.describe}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>名额数量：</strong>{{payReduceForm.count}}</el-col>
        <el-col :span="9"><strong>类别：</strong>{{payReduceForm.type}}</el-col>
        <!--<el-col :span="3"><strong>当前状态：</strong><span class="red">{{data.activityStatus | activityStatus}}</span></el-col>-->
      </el-row>
      <template v-if="payReduceForm.type == 'SATISFY'">
        <el-row>
          <el-col :span="12"><strong>满减金额：</strong>{{payReduceForm.reductionMoney}}</el-col>
        </el-row>
      </template>
      <template v-if="payReduceForm.type == 'DISCOUNT'">
        <el-col :span="12"><strong>折扣：</strong>{{payReduceForm.discount}}</el-col>
        <el-col :span="9"><strong>面额上限：</strong>{{payReduceForm.ceiling}}</el-col>
      </template>
      <template v-if="payReduceForm.type == 'RANDOM'">
        <el-col :span="12"><strong>金额范围：</strong>{{payReduceForm.scope}}元 - {{payReduceForm.scope2}} 元</el-col>
      </template>
      <template v-if="payReduceForm.type == 'PROBABILITY'">
        <div v-for="(item, index) in payReduceForm.prList" :key="index">
          <el-col :span="12"><strong> 概率：</strong>{{item.probability}}</el-col>
          <el-col :span="9"><strong> 金额：</strong>{{item.amount}}</el-col>
        </div>
      </template>
      <el-row>
        <el-col :span="12"><strong>订单金额下限：</strong>{{payReduceForm.lower}}</el-col>
        <el-col :span="9"><strong>立减名称：</strong>{{payReduceForm.reduceName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="9"><strong>数量阈值：</strong>{{payReduceForm.numThreshold}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { queryReductionDetail, prizeIsAllowEdit } from 'api/service'
import { REDUCE_TYPE } from 'common/config'
export default {
  data() {
    return {
      prizeId: '',
      payReduceForm: {
        count: '',
        type: 'SATISFY',
        types: [
          {
            value: 'SATISFY',
            label: '满减'
          },
          {
            value: 'DISCOUNT',
            label: '折扣减'
          },
          {
            value: 'RANDOM',
            label: '随机减'
          },
          {
            value: 'PROBABILITY',
            label: '概率减'
          }
        ],
        reductionMoney: '',
        discount: '',
        ceiling: '',
        scope: '',
        scope2: '',
        prList: [
          {
            amount: '',
            probability: ''
          }
        ],
        lower: '',
        reduceName: '',
        describe: '',
        numThreshold: ''
        // budgetThreshold: ''
      }
    }
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      this.prizeId = this.$route.query.prizeId
      this.urlType = Number(this.$route.query.type)
      this.settleConfigId = this.$route.query.settleConfigId
      this.budgetCode = this.$route.query.code
      // 存在奖品id，说明是修改功能
      if (this.prizeId) {
        this.queryPrizeDetail(this.prizeId)
      }
    },
    // 查询奖品数据详情
    queryPrizeDetail(prizeId) {
      let reqParams = {
        prizeId: prizeId
      }
      queryReductionDetail(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data.domain

          this.payReduceForm.count = data.total
          this.payReduceForm.type = REDUCE_TYPE[data.reductionType]
          this.payReduceForm.reductionMoney = data.amount
          this.payReduceForm.discount = data.discount
          this.payReduceForm.ceiling = data.amountCeiling
          this.payReduceForm.scope = data.amountFloor
          this.payReduceForm.scope2 = data.amountCeiling
          this.payReduceForm.prList = data.probability || [{
            amount: '',
            probability: ''
          }]
          this.payReduceForm.lower = data.orderAmountFloor
          this.payReduceForm.reduceName = data.reductionName
          this.payReduceForm.describe = data.desc
          this.payReduceForm.numThreshold = data.threshold
          // this.payReduceForm.budgetThreshold = data.threshol
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    prizeIsAllowEdit() {
      let reqParams = {
        prizeId: this.$route.query.prizeId
      }
      prizeIsAllowEdit(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          if (data === 'true') {
            this.editPrize()
          } else {
            this.$message.info(res.message)
          }
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    editPrize() {
      let path = '/marketingPlanManage/CreatePayReduce'
      this.$router.push({
        path: path,
        query: {
          prizeId: this.prizeId,
          planId: this.$route.query.planId,
          code: this.budgetCode,
          // type用于区分通用优惠券和激活优惠券
          type: this.urlType,
          settleConfigId: this.settleConfigId
        }
      })
    }



  }
}
</script>

<style lang='scss' scoped="scoped">
  .div_paddings { padding: 20px 0;}
  .coupon-detail {
    width: 100%;
    margin-bottom: 20px;
  .el-row {
    line-height: 30px;
  }
  }
  .detail-head {
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 15px;
    background: #eee;
  }
</style>
