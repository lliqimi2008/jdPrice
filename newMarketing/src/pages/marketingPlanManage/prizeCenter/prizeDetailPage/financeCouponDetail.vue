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
        <el-col :span="12"><strong>奖品ID：</strong>{{ruleForm.prizeId}}</el-col>
        <el-col :span="10"><strong>负责人ERP：</strong>{{ruleForm.director}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>预算编号：</strong>{{ruleForm.activityBudgetId}}</el-col>
        <el-col :span="12"><strong>券类别：</strong>{{ruleForm.typeDesc}}</el-col>
      </el-row>
      <template v-if="ruleForm.type == 1">
        <el-col :span="12"><strong>加息比率：</strong>{{ruleForm.rate}}</el-col>
        <el-col :span="12"><strong>加息天数：</strong>{{ruleForm.interestDayCount}}</el-col>
        <el-col :span="12"><strong>优惠上限：</strong>{{ruleForm.maxProfit}}</el-col>
      </template>
      <template v-if="ruleForm.type == 2">
        <el-col :span="12"><strong>优惠面额：</strong>每满{{ruleForm.satisfyValue}}元 返 {{ruleForm.profit}}元</el-col>
        <el-col :span="12"><strong>优惠上限：</strong>{{ruleForm.maxProfit}}元</el-col>
      </template>
      <template v-if="ruleForm.type == 3">
        <el-col :span="12"><strong>优惠面额：</strong>满{{ruleForm.satisfyValue}}元 返 {{ruleForm.profit}}元</el-col>
      </template>
      <template v-if="ruleForm.type == 8">
        <el-col :span="12"><strong>优惠面额：</strong>{{ruleForm.profit}}元</el-col>
        <el-col :span="12"><strong>金额使用门槛：</strong>{{ruleForm.satisfyValue}}元</el-col>
      </template>
      <template v-if="ruleForm.type == 11">
        <el-col :span="12"><strong>折扣：</strong>{{ruleForm.rate}}</el-col>
        <el-col :span="12"><strong>减免上限：</strong>{{ruleForm.maxProfit}}</el-col>
        <el-col :span="12"><strong>优惠时间：</strong>优惠开始于第{{ruleForm.relativeStartValue}}天 持续{{ruleForm.relativeEndValue}}天</el-col>
      </template>
      <template v-if="ruleForm.type == 12">
        <el-col :span="12"><strong>优惠面额：</strong>费率{{ruleForm.rate}}%</el-col>
        <el-col :span="12"><strong>订单金额限制：</strong>{{ruleForm.compareType}}{{ruleForm.satisfyValue}}元</el-col>
      </template>
      <template v-if="ruleForm.type == 13">
        <el-col :span="12"><strong>优惠面额：</strong>满{{ruleForm.satisfyValue}}元 返{{ruleForm.profit}}毫克</el-col>
        <!-- <el-col :span="12"><strong>订单金额限制：</strong>{{ruleForm.compareType}}{{ruleForm.satisfyValue}}元</el-col> -->
      </template>
      <template v-if="ruleForm.type == 14">
        <el-col :span="12"><strong>优惠券面额：</strong>{{ruleForm.profit}}</el-col>
      </template>
      <template v-if="ruleForm.type == 15">
        <el-col :span="12"><strong>优惠面额：</strong>满{{ruleForm.satisfyValue}}元 减 {{ruleForm.profit}}元</el-col>
      </template>
      <template v-if="ruleForm.type == 16">
        <el-col :span="12"><strong>订单金额限制：</strong>{{ruleForm.satisfyValue}}</el-col>
        <el-col :span="12"><strong>折扣：</strong>{{ruleForm.rate}}</el-col>
        <el-col :span="12"><strong>优惠上限：</strong>{{ruleForm.maxProfit}}</el-col>
      </template>
      <el-row>
        <el-col :span="12"><strong>优惠券名称：</strong>{{ruleForm.name}}</el-col>
        <el-col :span="12"><strong>有效期：</strong>{{ruleForm.validDateDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>优惠券数量：</strong>{{ruleForm.estimateCount}}</el-col>
        <el-col :span="12"><strong>余量阈值：</strong>{{ruleForm.threshold}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>手机号：</strong>{{ruleForm.tel}}</el-col>
      </el-row>
      <div class="div_paddings">
        <hr/>
      </div>
      <el-row>
        <el-col :span="12"><strong>负责人邮箱：</strong>{{ruleForm.email}}</el-col>
        <el-col :span="12"><strong>平台限制：</strong>{{ruleForm.platformDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>返利方式：</strong>{{ruleForm.profitWayDesc}}</el-col>
        <el-col :span="12"><strong>使用说明：</strong>{{ruleForm.descs}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>PC端引导链接：</strong>{{ruleForm.offerUrl}}</el-col>
        <el-col :span="12"><strong>H5端引导链接：</strong>{{ruleForm.offerHUrl}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>金融app引导链接：</strong>{{ruleForm.offerMUrl}}</el-col>
        <template v-if="ruleForm.type != 13">
          <el-col :span="12"><strong>品类说明：</strong>{{ruleForm.categoryDesc}}</el-col>
        </template>
      </el-row>
      <template v-if="ruleForm.bigCategory == 2">
        <el-row>
          <el-col :span="12"><strong>jumpType(APP)：</strong>{{jumpType}}</el-col>
          <el-col :span="12"><strong>jumpUrl(APP)：</strong>{{jumpUrl}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><strong>orderId(APP)：</strong>{{orderId}}</el-col>
          <el-col :span="12"><strong>productId(APP)：</strong>{{productId}}</el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { formatDate } from 'utils/util'
import { findCategoryDetail, prizeIsAllowEdit } from 'api/service'
export default {
  data() {
    return {
      bigCategoryName: this.$route.query.bigCategoryName,
      profitWays: '',
      validateDateTypes: [
        {
          value: 1,
          name: '固定'
        },
        {
          value: 2,
          name: '相对'
        }
      ],
      types: '',
      smallCategoryTypes: '',
      platforms: '',
      smallCategoryItem: {
        smallType: '',
        smallCategoryValues: '',
        comment: '',
        maxlength: '',
        defaultDesc: ''
      },
      compareTypes: [
        {
          value: 1,
          name: '等于'
        },
        {
          value: 2,
          name: '大于'
        },
        {
          value: 3,
          name: '小于'
        },
        {
          value: 4,
          name: '大于等于'
        },
        {
          value: 5,
          name: '小于等于'
        }
      ],
      smallCategoryValuesArray: [],
      jumpType: '',
      jumpUrl: '',
      orderId: '',
      productId: '',
      ruleForm: {
        platformsArray: [],
        couponKey: '',
        bigCategory: '',
        scopeType: 1,
        useRate: '60',
        planId: '',
        createdBy: store.getters.userInfo.erp,
        modifiedBy: store.getters.userInfo.erp,
        director: '',
        prizeId: '',
        descs: '',
        email: '',
        estimateCount: '',
        name: '',
        offerHUrl: '',
        offerUrl: '',
        offerMUrl: '',
        platforms: '',
        satisfyValue: '',
        rate: '',
        profit: '',
        maxProfit: '',
        profitWay: '',
        startTime: '',
        endTime: '',
        tel: '',
        threshold: '',
        compareType: '',
        type: '',
        smallCategoryType: '',
        smallCategoryValues: '',
        validateDateType: 1,
        dateCount: '',
        dateCountUnit: '',
        relativeStartValue: '',
        relativeEndValue: '',
        interestDayCount: ''
      },
      isVerificationBy: false
    }
  },
  activated() {
    this.init()
  },
  deactivated() {
    this.$destroy(true)
  },
  methods: {
    init() {
      this.findCategoryDetail()
    },
    findCategoryDetail() {
      let reqParams = {
        prizeId: this.$route.query.prizeId
      }
      findCategoryDetail(reqParams)
        .then(res => {
          let data = res.data || {}
          // this.ruleForm = data
          console.log(data)
          this.ruleForm.activityBudgetId = data.activityBudgetId
          this.ruleForm.descs = data.descs
          this.ruleForm.estimateCount = data.estimateCount
          this.ruleForm.name = data.name
          this.ruleForm.offerHUrl = data.offerHUrl
          this.ruleForm.offerUrl = data.offerUrl
          this.ruleForm.platforms = data.platforms
          this.ruleForm.satisfyValue = data.satisfyValue
          this.ruleForm.rate = data.rate
          this.ruleForm.profit = data.profit
          this.ruleForm.maxProfit = data.maxProfit
          this.ruleForm.profitWay = data.profitWay
          this.ruleForm.profitWayDesc = data.profitWayDesc
          this.ruleForm.tel = data.tel
          this.ruleForm.director = data.director
          this.ruleForm.email = data.email
          this.ruleForm.threshold = data.threshold
          this.ruleForm.compareType = data.compareType
          this.ruleForm.dateCount = data.dateCount
          this.ruleForm.relativeStartValue = data.relativeStartValue
          this.ruleForm.relativeEndValue = data.relativeEndValue
          this.ruleForm.interestDayCount = data.interestDayCount
          this.ruleForm.validateDateType = data.validateDateType
          this.ruleForm.validDateDesc = data.validDateDesc
          this.ruleForm.platformDesc = data.platformDesc
          this.ruleForm.categoryDesc = data.categoryDesc
          this.ruleForm.prizeId = data.prizeId
          this.ruleForm.planId = data.planId
          this.ruleForm.bigCategory = data.bigCategory
          this.ruleForm.couponKey = data.couponKey


          if (this.ruleForm.bigCategory !== 2) {
            this.ruleForm.offerMUrl = data.offerMUrl
          } else {
            // {"jumpType":"6","jumpUrl":"134","orderId":"jimu_user_info-1892","productId":"jimu_user_info-1892,CJHXJJ"}
            if (data.offerMUrl) {
              let offmurl = JSON.parse(data.offerMUrl)
              this.jumpType = offmurl.jumpType
              this.jumpUrl = offmurl.jumpUrl
              this.orderId = offmurl.orderId
              this.productId = offmurl.productId
            }
          }

          this.ruleForm.profitWay = data.profitWay.toString()
          this.ruleForm.type = data.type.toString()
          this.ruleForm.typeDesc = data.typeDesc

          this.ruleForm.startTime = data.startTime !== '' ? formatDate('YYYY-MM-DD hh:mm:ss', data.startTime) : ''
          this.ruleForm.endTime = data.endTime !== '' ? formatDate('YYYY-MM-DD hh:mm:ss', data.endTime) : ''

          // plateforms
          let platformsArr = []
          var pf = data.platforms.split(',')
          for (let i = 0; i < pf.length; i++) {
            platformsArr.push(pf[i])
          }
          this.ruleForm.platformsArray = platformsArr
          this.ruleForm.platforms = ''
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
      let path = '/marketingPlanManage/financeCouponPrize/createOrUpdateFinanceCoupon'
      this.$router.push({
        path: path,
        query: {
          couponKey: this.ruleForm.couponKey,
          bigCategory: this.ruleForm.bigCategory,
          planId: this.ruleForm.planId,
          prizeId: this.ruleForm.prizeId
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
