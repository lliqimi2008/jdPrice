<template>
  <div class="coupon-detail">
    <div class="pub-sm-title clear">
      <h3 class="fl">实物奖品详情</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="prizeIsAllowEdit">编辑</el-button>
      </el-row>
    </div>
    <div class="pv bg-pad-border">
        <el-row>
          <el-col :span="12"><strong>奖品ID：</strong>{{prizeId}}</el-col>
          <el-col :span="12"><strong>奖品描述：</strong>{{prizeData.desc}}</el-col>
        </el-row>
        <el-row>
        <el-col :span="12"><strong>奖品名称：</strong>{{prizeData.physicalPrizeName}}</el-col>
        <el-col :span="12"><strong>奖品数量：</strong>{{prizeData.total}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>负责人：</strong>{{prizeData.director}}</el-col>
          <el-col :span="12"><strong>电话：</strong>{{prizeData.tel}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>邮箱：</strong>{{prizeData.email}}</el-col>
          <el-col :span="12"><strong>奖品面额：</strong>{{prizeData.amount}}</el-col>
        </el-row>
    </div>
  </div>
</template>
<script>
import { queryNobudgetPrizeDetail, prizeIsAllowEdit } from 'api/service'
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
      let path = '/marketingPlanManage/physicalPrize'
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
