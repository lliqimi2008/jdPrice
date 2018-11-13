<template>
  <div class="coupon-detail">
    <div class="pub-sm-title clear">
      <h3 class="fl" v-if="prizeData.interCategory === 'XJK'">小金库红包奖品详情</h3>
      <h3 class="fl" v-if="prizeData.interCategory === 'JING_DOU'">京豆奖品详情</h3>
      <h3 class="fl" v-if="prizeData.interCategory === 'DONG_QUAN'">东券奖品详情</h3>
      <h3 class="fl" v-if="prizeData.interCategory === 'BAI_TIAO'">白条券奖品详情</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="prizeIsAllowEdit">编辑</el-button>
        <!--<el-button v-show="data.activityStatus === 'EDITING' ? true : false" size="mini" type="primary" @click="editCoupon">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'AUDITED' ? true : false" size="mini" type="primary" @click="editCoupon">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'AUDITING_FAIL' ? true : false" size="mini" type="primary" @click="editCoupon">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'TEST_PASS' ? true : false" size="mini" type="primary" @click="editCoupon">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'TEST_FAIL' ? true : false" size="mini" type="primary" @click="editCoupon">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'PRE_ONLINE' ? true : false" size="mini" type="primary" @click="editCoupon">编辑</el-button>-->
        <!-- <el-button size="mini" type="primary">活动数据</el-button>
        <el-button size="mini" type="primary">发起审核</el-button>
        <el-button size="mini" type="primary">测试</el-button>
        <el-button size="mini" type="primary">测试通过</el-button>
        <el-button size="mini" type="primary">暂停</el-button>
        <el-button size="mini" type="primary">上线</el-button> -->
      </el-row>
    </div>
    <div class="pv bg-pad-border">
      <el-row>
        <el-col :span="12"><strong>奖品ID：</strong>{{prizeId}}</el-col>
        <el-col :span="12"><strong>奖品名称：</strong>{{prizeData.interName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>奖品数量：</strong>{{prizeData.total}}</el-col>
        <el-col :span="12"><strong>token：</strong>{{prizeData.token}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>类别：</strong>{{prizeData.interTypeDesc}}</el-col>
        <el-col :span="12"><strong>数量阈值：</strong>{{prizeData.threshold}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>负责人：</strong>{{prizeData.director}}</el-col>
        <el-col :span="12"><strong>电话：</strong>{{prizeData.tel}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>邮箱：</strong>{{prizeData.email}}</el-col>
        <el-col :span="12"><strong>数量阈值：</strong>{{prizeData.threshold}}</el-col>
      </el-row>
      <!--小金库-->
      <template v-if="prizeData.interCategory === 'XJK'">
        <template v-if="prizeData.interType === 'XFA'">
          <!--固定面额-->
          <el-row>
            <el-col :span="12"><strong>奖品面额：</strong>{{prizeData.amount}}</el-col>
          </el-row>
        </template>
        <template v-if="prizeData.interType === 'XOP'">
          <!--订单金额比例-->
          <el-row>
            <el-col :span="12"><strong>订单比例：</strong>{{prizeData.percentage}}</el-col>
            <el-col :span="12"><strong>金额上限：</strong>{{prizeData.amountCeiling}}</el-col>
          </el-row>
        </template>
        <template v-if="prizeData.interType === 'XRA'">
          <!--随机金额-->
          <el-row>
            <el-col :span="12"><strong>金额上限：</strong>{{prizeData.amountCeiling}}</el-col>
            <el-col :span="12"><strong>金额下线：</strong>{{prizeData.amountFloor}}</el-col>
          </el-row>
        </template>
        <template v-if="prizeData.interType === 'XPB'">
          <!--概率-->
          <el-row>
            <el-col :span="12" v-for="(item, index) in prizeData.probability" :key="index" ><strong>概率{{index}}：</strong>金额{{item.amount}}-比列{{item.probability}}</el-col>
          </el-row>
        </template>
      </template>

      <!--金豆-->
      <template v-if="prizeData.interCategory === 'JING_DOU'">
        <el-row>
          <el-col :span="12"><strong>callerId：</strong>{{prizeData.callerId}}</el-col>
          <el-col :span="12"><strong>businessId：</strong>{{prizeData.businessId}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>topBusinessId：</strong>{{prizeData.topBusinessId}}</el-col>
          <el-col :span="12"><strong>secondBusinessId：</strong>{{prizeData.secondBusinessId}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>key：</strong>{{prizeData.key}}</el-col>
          <el-col :span="12"><strong>orgId：</strong>{{prizeData.orgId}}</el-col>
        </el-row>
        <template v-if="prizeData.interType === 'JFA'">
          <!--固定面额-->
          <el-row>
            <el-col :span="12"><strong>奖品面额：</strong>{{prizeData.amount}}</el-col>
          </el-row>
        </template>
        <template v-if="prizeData.interType === 'JOP'">
          <!--订单金额比例-->
          <el-row>
            <el-col :span="12"><strong>订单比例：</strong>{{prizeData.percentage}}</el-col>
            <el-col :span="12"><strong>金额上限：</strong>{{prizeData.amountCeiling}}</el-col>
          </el-row>
        </template>
        <template v-if="prizeData.interType === 'JRA'">
          <!--随机金额-->
          <el-row>
            <el-col :span="12"><strong>金额上限：</strong>{{prizeData.amountCeiling}}</el-col>
            <el-col :span="12"><strong>金额下线：</strong>{{prizeData.amountFloor}}</el-col>
          </el-row>
        </template>
        <template v-if="prizeData.interType === 'JPB'">
          <!--概率-->
          <el-row>
            <el-col :span="12" v-for="(item, index) in prizeData.probability" :key="index" ><strong>概率{{index}}：</strong>金额{{item.amount}}-比列{{item.probability}}</el-col>
          </el-row>
        </template>
      </template>

      <!--东券-->
      <template v-if="prizeData.interCategory === 'DONG_QUAN'">
        <el-row>
          <el-col :span="12"><strong>东券ID：</strong>{{prizeData.director}}</el-col>
          <el-col :span="12"><strong>京东商城优惠券key：</strong>{{prizeData.director}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>京东商城优惠券活动规则ID：</strong>{{prizeData.director}}</el-col>
        </el-row>
      </template>

      <!--白条券-->
      <template v-if="prizeData.interCategory === 'BAI_TIAO'">
        <el-row>
          <el-col :span="12"><strong>白条优惠券ID：</strong>{{prizeData.extendString}}</el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script>
import { queryNobudgetPrizeDetail, prizeIsAllowEdit } from 'api/service'
import { INTER_PRIZE_TYPE } from 'common/config'
export default {
  data() {
    return {
      prizeData: [],
      prizeId: ''
    }
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      this.prizeId = this.$route.query.prizeId
      this.queryNobudgetPrizeDetail()
    },
    // 查询奖品数据详情
    queryNobudgetPrizeDetail() {
      let reqParams = {
        prizeId: this.prizeId
      }
      queryNobudgetPrizeDetail(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          data.interTypeDesc = INTER_PRIZE_TYPE[data.interType]
          if (data.hasOwnProperty('extendValue')) {
            data.orgId = data.extendValue.orgId
            data.callerId = data.extendValue.callerId
            data.businessId = data.extendValue.businessId
            data.topBusinessId = data.extendValue.topBusinessId
            data.secondBusinessId = data.extendValue.secondBusinessId
            data.synCashing = data.extendValue.synCashing
            data.key = data.extendValue.key
            data.extendString = data.extendString
          }
          this.prizeData = data
          console.log(this.prizeData)
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
      let path = ''
      if (this.prizeData.interCategory === 'XJK') {
        path = '/marketingPlanManage/vaultRedEnvelope'
      } else if (this.prizeData.interCategory === 'JING_DOU') {
        path = '/marketingPlanManage/metroplisBean'
      } else if (this.prizeData.interCategory === 'DONG_QUAN') {
        path = '/marketingPlanManage/eastTicket'
      } else if (this.prizeData.interCategory === 'BAI_TIAO') {
        path = '/marketingPlanManage/iousTicket'
      }
      this.$router.push({
        path: path,
        query: {
          prizeId: this.prizeId,
          planId: this.$route.query.planId,
          auditStatus: this.$route.query.auditStatus
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped="scoped">
  .coupon-detail {
    width: 100%;
    margin-bottom: 20px;
  .el-row {
    line-height: 30px;
  }
  }

</style>
