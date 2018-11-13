<template>
  <div class="coupon-detail">
    <div class="pub-sm-title clear">
      <h3 class="fl">优惠券详情</h3>
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
        <el-col :span="12"><strong>奖品面额：</strong>{{couponsForm.certificateNum}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>业务类型：</strong>{{couponsForm.businessType}}</el-col>
        <el-col :span="9"><strong>优惠券数量：</strong>{{couponsForm.count}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>有效时间类型：</strong>{{couponsForm.timeTypeName}}</el-col>
        <template v-if="couponsForm.timeType == 'FIXED'">
          <el-col :span="10"><strong>有效时间：</strong>开始时间{{couponsForm.startDate}}-结束时间{{couponsForm.endDate}}</el-col>
        </template>
        <template v-if="couponsForm.timeType == 'DYNAMIC'">
          <el-col :span="10"><strong>有效时间：</strong>{{couponsForm.validDataStartDay}}天后生效-{{couponsForm.validDataEndDay}}天后过期</el-col>
        </template>
        <template v-if="couponsForm.timeType == 'HOUR'">
          <el-col :span="10"><strong>有效时间：</strong>{{couponsForm.validDataEndHours}}小时后过期</el-col>
        </template>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>类别：</strong>{{couponsForm.certificateType}}</el-col>
        <el-col :span="10"><strong>折扣：</strong>{{couponsForm.certificateDiscount}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>面额上限：</strong>{{couponsForm.certificateNumTop}}</el-col>
        <el-col :span="10"><strong>金额使用下限：</strong>{{couponsForm.certificateNumLow}}</el-col>
      </el-row>
      <template v-if="urlType===2">
        <el-row>
          <el-col :span="12"><strong>激活时间类型：</strong>{{couponsForm.activeTimeType}}</el-col>
          <el-col :span="10"><strong>激活有效时间：</strong>{{couponsForm.activeStartDate | formatDate('YYYY-MM-DD hh:mm:ss')}} / {{couponsForm.activeEndDate | formatDate('YYYY-MM-DD hh:mm:ss')}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>激活引导链接：</strong></el-col>
          <el-col :span="10"><strong>激活说明：</strong></el-col>
        </el-row>
      </template>
      <el-row>
        <el-col :span="12"><strong>退款是否恢复：</strong>{{couponsForm.ifRecover ? (couponsForm.ifRecover === true ? '是' : '否') : ''}}</el-col>
        <el-col :span="10"><strong>是否支持转让：</strong>{{couponsForm.ifTransfer ? (couponsForm.ifTransfer === true ? '是' : '否') : ''}}</el-col>
      </el-row>
      <div class="div_paddings">
        <hr/>
      </div>
      <el-row>
        <el-col :span="12"><strong>优惠券名称：</strong>{{couponsForm.couponsName}}</el-col>
        <el-col :span="12"><strong>适用平台：</strong>{{couponsForm.platform}}</el-col>
        <!-- <el-col :span="10"><strong>活动内奖项获取限制：</strong></el-col> -->
      </el-row>
      <el-row>
        <el-col :span="12"><strong>优惠券描述：</strong>{{couponsForm.description}}</el-col>
        <el-col :span="12"><strong>使用说明：</strong>{{couponsForm.howUse}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>PC端引导链接：</strong>{{couponsForm.PCLink}}</el-col>
        <el-col :span="12"><strong>H5端引导链接：</strong>{{couponsForm.H5Link}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>APP端引导链接：</strong>{{couponsForm.APPLink}}</el-col>
        <el-col :span="12"><strong>使用率阈值：</strong>{{couponsForm.useLimit}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>余量阈值：</strong>{{couponsForm.leftLimit}}</el-col>
      </el-row>
    </div>
    <div class="pub-sm-title clear">
      <h3 class="fl">奖品规则</h3>
    </div>

    <div class="single-rule-content">
      <div class="rules-box-body">
        <el-table
          class="fixed-height"
          :data="rulesDataList"
          border
          stripe>
          <el-table-column
            prop="ruleName"
            label="规则名称">
            <template slot-scope="scope">
              {{scope.row.field | ruleNames}}
            </template>
          </el-table-column>
          <el-table-column
            prop="field"
            label="对应规则">
            <template slot-scope="scope">
              {{scope.row.field}}
            </template>
          </el-table-column>
          <el-table-column
            prop="calType"
            label="计算类型"
            width="100px">
            <template slot-scope="scope">
              {{scope.row.calType}}
            </template>
          </el-table-column>
          <el-table-column
            prop="calValue"
            label="计算值"
            width="100px">
            <template slot-scope="scope">
              {{scope.row.calValue}}
            </template>
          </el-table-column>
          <el-table-column
            prop="extension"
            label="扩展值"
            width="300px">
            <template slot-scope="scope">
              {{scope.row.extension}}
            </template>
          </el-table-column>
          <el-table-column
            prop="noPassDesc"
            label="错误文案"
            width="250px">
            <template slot-scope="scope">
              {{scope.row.noPassDesc}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'utils/util'
import { queryPrizeDetail, searchRule, prizeIsAllowEdit } from 'api/service'
import { BUSINESS_TYPE, TIME_TYPE, CERTIFICATE_TYPE, ACTIVITY_TIME_TYPE } from 'common/config'
export default {
  data() {
    return {
      // 优惠券表单属性
      couponsForm: {
        activeConditions: [],
        activeTimeType: '',
        businessType: '',
        count: '',
        timeType: '',
        startDate: '',
        endDate: '',
        activeStartDate: '',
        activeEndDate: '',
        validDataStartDay: '',
        validDataEndDay: '',
        certificateType: '',
        certificateNum: '',
        certificateDiscount: '',
        certificateNumTop: '',
        certificateNumLow: '',
        ifRecover: true,
        ifTransfer: true,
        // 模板数据
        couponsName: '',
        platform: '',
        description: '',
        howUse: '',
        PCLink: '',
        H5Link: '',
        APPLink: '',
        // budgetLimit: '',
        useLimit: '',
        leftLimit: ''
      },
      urlType: '',
      prizeId: '',
      settleConfigId: '',
      budgetCode: '',
      rulesDataList: []

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
      this.searchRules()
    },
    // 查询奖品数据详情
    queryPrizeDetail(prizeId) {
      let reqParams = {
        prizeId: prizeId
      }
      queryPrizeDetail(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data.domain || {}
          this.couponsForm.activeConditions = data.extendValue['33'] ? data.extendValue['33'].split(',') : []
          this.couponsForm.activeTimeType = data.extendValue['32'] ? data.extendValue['32'] : 'FIXED'
          this.couponsForm.activeTimeType = ACTIVITY_TIME_TYPE[data.extendValue['32'] ? data.extendValue['32'] : 'FIXED']
          this.couponsForm.businessType = BUSINESS_TYPE[data.bizType]
          this.couponsForm.count = data.total
          this.couponsForm.timeType = data.validityType
          this.couponsForm.timeTypeName = TIME_TYPE[data.validityType]
          this.couponsForm.startDate = formatDate(
            'YYYY-MM-DD hh:mm:ss',
            data.validityFromTime
          )
          this.couponsForm.endDate = formatDate(
            'YYYY-MM-DD hh:mm:ss',
            data.validityToTime
          )
          this.couponsForm.activeStartDate =
            data.extendValue['29'] !== ''
              ? formatDate('YYYY-MM-DD hh:mm:ss', data.extendValue['29'])
              : ''
          this.couponsForm.activeEndDate =
            data.extendValue['30'] !== ''
              ? formatDate('YYYY-MM-DD hh:mm:ss', data.extendValue['30'])
              : ''
          this.couponsForm.validDataStartDay = data.validityDelayDays

          if (this.couponsForm.timeType === 'HOUR') {
            this.couponsForm.validDataEndHours = data.validityDays
          } else {
            this.couponsForm.validDataEndDay = data.validityDays
          }
          this.couponsForm.certificateType = CERTIFICATE_TYPE[data.couponType]
          this.couponsForm.certificateNum = data.amount
          this.couponsForm.certificateDiscount = data.discount
          this.couponsForm.certificateNumTop = data.amountCeiling
          this.couponsForm.certificateNumLow = data.orderAmountFloor
          this.couponsForm.ifRecover = data.recoverRefunding
          this.couponsForm.ifTransfer = data.supportTransfer
          // 模板数据
          this.couponsForm.couponsName = data.couponName
          this.couponsForm.platform = data.platformRestrict
          this.couponsForm.description = data.desc
          this.couponsForm.howUse = data.instructions
          this.couponsForm.PCLink = data.extendValue['0044'] || ''
          this.couponsForm.H5Link = data.extendValue['0045'] || ''
          this.couponsForm.APPLink = data.extendValue['0043'] || ''
          // this.couponsForm.budgetLimit = data.amountThreshold
          this.couponsForm.useLimit = data.useThreshold
          this.couponsForm.leftLimit = data.threshold
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    searchRules() {
      let reqParams = {
        entranceId: this.$route.query.prizeId
      }
      searchRule(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.rulesDataList = data
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
      let path = '/marketingPlanManage/createCoupons'
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
  .single-rule-content {
  // margin-right: 10px;
    margin-bottom: 20px;
  }
  .single-hint-text {
    line-height: 16px;
    color: #999;
    font-size: 12px;
  }
  .single-hint-text {
    line-height: 30px;
  }
</style>
