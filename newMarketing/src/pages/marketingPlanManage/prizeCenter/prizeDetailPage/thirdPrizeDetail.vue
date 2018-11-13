<template>
  <div class="coupon-detail">
    <div class="pub-sm-title clear">
      <h3 class="fl">第三方奖品详情</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="prizeIsAllowEdit">编辑</el-button>
      </el-row>
    </div>
    <div class="pv bg-pad-border">
      <el-row>
        <el-col :span="12"><strong>奖品ID：</strong>{{prizeId}}</el-col>
        <el-col :span="12"><strong>奖品标题：</strong>{{prizeData.titlePrefix}}{{prizeData.titleSuffix}}</el-col>
      </el-row>
        <el-row>
          <el-col :span="12"><strong>奖品副标题：</strong>{{prizeData.subTitle}}</el-col>
          <el-col :span="12"><strong>奖品描述：</strong>{{prizeData.desc}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>奖品名称：</strong>{{prizeData.thirdPrizeName}}</el-col>
          <el-col :span="12"><strong>奖品说明：</strong>{{prizeData.instructions}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>商家名称：</strong>{{prizeData.merchantName}}</el-col>
          <el-col :span="12"><strong>券码转二维码：</strong>{{prizeData.showQr === true ? '是' : '否'}}</el-col>
        </el-row>
        <el-row>
          <template v-if="prizeData.validityType === 'FIXED'">
            <el-col :span="12"><strong>有效时间：</strong>起始日期{{prizeData.validityFromTime | formatDate('YYYY-MM-DD hh:mm:ss')}} 结束日期 {{prizeData.validityToTime | formatDate('YYYY-MM-DD hh:mm:ss')}}</el-col>
          </template>
          <template v-if="prizeData.validityType === 'DYNAMIC'">
            <el-col :span="12"><strong>有效时间：</strong>自领用之日起{{prizeData.validityDelayDays}}天有效</el-col>
          </template>
          <el-col :span="12"><strong>PC跳转链接：</strong>{{prizeData.pcUrl}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>H5跳转链接：</strong>{{prizeData.h5Url}}</el-col>
          <el-col :span="12"><strong>原生跳转链接：</strong>{{prizeData.commonUrl}}</el-col>
        </el-row>
      <div class = "introduction" v-html= "prizeData.introduction"></div>
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
      let path = '/marketingPlanManage/thirdPartyPrize'
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
  .introduction{
    border:1px solid #CCC
  }
</style>
