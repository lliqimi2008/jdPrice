<template>
  <div class="add-pocket-money display-table">
    <div class="pub-sm-title clear">
      <h3 v-if="createSubTitle === '1'">通用优惠券配置</h3>
      <h3 v-if="createSubTitle === '2'">激活优惠券</h3>
    </div>

    <el-form class="app-form-panel" label-position="right" label-width="130px" size="small" ref="budgetPrize" :model="couponsForm" :rules="couponsFormRules">
      <el-form-item label="业务类型：">
        <el-select class="select100" v-model="couponsForm.businessType" placeholder="请选择" size="small">
          <el-option
            v-for="(item, index) in businessTypes"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券数量：" prop="count">
        <el-input placeholder="必填，1-100000000之间" v-model="couponsForm.count"></el-input>
      </el-form-item>
      <el-form-item label="有效时间类型：">
        <el-select class="select100" v-model="couponsForm.timeType" placeholder="固定" @change="timeTypeChange">
          <el-option label="固定" value="FIXED"></el-option>
          <el-option label="动态" value="DYNAMIC"></el-option>
          <el-option label="小时" value="HOUR"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="is-required" label="有效时间：" v-if="couponsForm.timeType == 'FIXED'">
        <el-col :span="6">
          <el-form-item class="null-label" label="" prop="startDate">
            <el-date-picker
              class="select100"
              type="datetime"
              placeholder="开始日期"
              default-time="00:00:00"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="couponsForm.startDate"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col class="text-center" :span="1">-</el-col>
        <el-col :span="6">
          <el-form-item class="null-label" label="" prop="endDate">
            <el-date-picker
              class="select100"
              type="datetime"
              placeholder="结束日期"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="couponsForm.endDate"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <template v-if="couponsForm.timeType == 'DYNAMIC'">
        <el-col :span="10">
          <el-form-item label="有效时间：" prop="validDataStartDay">
            <el-input placeholder="生效时间" v-model="couponsForm.validDataStartDay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <span class="hint-text">天后生效</span>
        </el-col>
        <el-col :span="9">
          <el-form-item class="null-label" label="" prop="validDataEndDay">
            <el-input placeholder="过期时间" v-model="couponsForm.validDataEndDay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <span class="hint-text">天后过期</span>
        </el-col>
      </template>

      <template v-if="couponsForm.timeType == 'HOUR'">
        <el-col :span="10">
          <el-form-item label="有效时间：" prop="validDataEndHours">
            <el-input placeholder="过期时间" v-model="couponsForm.validDataEndHours"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <span class="hint-text">小时后过期</span>
        </el-col>
      </template>
      <div class="clear"></div>

      <el-form-item label="优惠券类别：">
        <el-select class="select100" v-model="couponsForm.certificateType" @change="certificateTypeChange">
          <el-option label="满减券" value="SATISFY"></el-option>
          <el-option label="折扣券" value="DISCOUNT"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券面额：" v-if="couponsForm.certificateType == 'SATISFY'" prop="certificateNum">
        <el-input placeholder="必填，奖品面值，最多精确到小数点后两位" v-model="couponsForm.certificateNum"></el-input>
      </el-form-item>

      <template v-if="couponsForm.certificateType == 'DISCOUNT'">
        <el-form-item label="折扣：" prop="certificateDiscount">
          <el-input placeholder="必填，限制输入10-100，小数点后两位，折扣金额为交易金额*(1-折扣)，8折即80%" v-model="couponsForm.certificateDiscount"></el-input>
          <span class="tips-text">%</span>
        </el-form-item>
        <el-form-item label="面额上限：" prop="certificateNumTop">
          <el-input placeholder="必填，奖品面额最大值，最多精确到小数点后两位" v-model="couponsForm.certificateNumTop"></el-input>
          <span class="tips-text">元</span>
        </el-form-item>
      </template>

      <el-form-item label="使用门槛金额：" prop="certificateNumLow">
        <el-input placeholder="必填，使用优惠券的订单最小金额，如不限制请填0" v-model="couponsForm.certificateNumLow"></el-input>
        <span class="tips-text">元</span>
      </el-form-item>


      <!-- 激活优惠券区域 -->
      <template v-if="urlType===2">
        <el-form-item label="激活条件" prop="activeConditions">
          <el-checkbox-group v-model="couponsForm.activeConditions">
            <el-checkbox name="activeConditions" label="JQ">开通京东闪付</el-checkbox>
            <!--<el-checkbox name="activeConditions" label="JC">开通码付</el-checkbox>
            <el-checkbox name="activeConditions" label="SSP">三星pay绑卡</el-checkbox>
            <el-checkbox name="activeConditions" label="HWP">华为pay绑卡</el-checkbox>
            <el-checkbox name="activeConditions" label="AP">Apple pay绑卡</el-checkbox>-->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="激活时间类型">
          <el-select class="select100" v-model="couponsForm.activeTimeType">
            <el-option label="固定" value="FIXED"></el-option>
            <el-option label="动态" value="DYNAMIC"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="激活有效时间：" v-if="couponsForm.activeTimeType == 'FIXED'">
          <!-- <el-date-picker
            v-model="couponsForm.activeTime"
            type="daterange"
            start-placeholder="开始日期"
            range-separator="至"
            end-placeholder="结束日期"
            size="small">
          </el-date-picker> -->

          <el-col :span="6">
            <el-form-item class="null-label" label="" prop="activeStartDate">
              <el-date-picker
              class="select100"
              type="datetime"
              placeholder="开始日期"
              default-time="00:00:00"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="couponsForm.activeStartDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1">-</el-col>
          <el-col :span="6">
            <el-form-item class="null-label" label="" prop="activeEndDate">
              <el-date-picker
              class="select100"
              type="datetime"
              placeholder="结束日期"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="couponsForm.activeEndDate"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <template v-if="couponsForm.activeTimeType == 'DYNAMIC'">
          <el-col :span="10">
            <el-form-item label="动态类型：" prop="dynamicType">
              <el-input placeholder="失效时间" v-model="couponsForm.dynamicType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <span class="hint-text">天后失效</span>
          </el-col>
        </template>
        <div class="clear"></div>

      </template>

      <el-form-item label="退款是否恢复：">
        <el-select class="select100" v-model="couponsForm.ifRecover">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="是否支持转让：">
        <el-select class="select100" v-model="couponsForm.ifTransfer">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item> -->
      <div class="line"></div>

      <div class="btns mar-t-20 mar-b-20" >
        <el-button type="primary" @click="setTemplate('ShanFuShangHu')">闪付-限商户模板</el-button>
        <el-button type="primary" @click="setTemplate('ShanFuTongYong')">闪付-线下通用模板</el-button>
        <el-button type="primary" @click="setTemplate('FuKuanMaShangHu')">付款码-限商户模板</el-button>
        <el-button type="primary" @click="setTemplate('FuKuanMaTongYong')">付款码-线下通用模板</el-button>
        <el-button type="primary" @click="setTemplate('ZhiFuQuan')">支付券模板</el-button>
      </div>
      <el-form-item label="优惠券名称：" prop="couponsName" ref="couponsName">
        <el-input placeholder="对奖品进行命名，该名字会用于前端展示及短信发放，限10字以内" v-model="couponsForm.couponsName"></el-input>
      </el-form-item>
      <el-form-item label="适用平台：" prop="platform" ref="platform">
        <el-input placeholder="必填，用于会员中心-卡券展示页面，向用户展示并引导用户使用奖品的平台，可填多个，不建议超过2个" v-model="couponsForm.platform"></el-input>
      </el-form-item>
      <el-form-item label="优惠券描述：" prop="description" ref="description">
        <el-input placeholder="可自定义描述，限10个字以内" v-model="couponsForm.description"></el-input>
      </el-form-item>
      <el-form-item label="使用说明：" prop="howUse" ref="howUse">
        <el-input type="textarea" placeholder="必填，用于前端展示，限制100个字" v-model="couponsForm.howUse"></el-input>
      </el-form-item>
      <el-form-item label="PC端引导链接：">
        <el-input placeholder="卡券PC端跳转链接，没有可不填" v-model="couponsForm.PCLink"></el-input>
      </el-form-item>
      <el-form-item label="H5端引导链接：">
        <el-input placeholder="卡券H5端跳转链接，请尽量填写" v-model="couponsForm.H5Link"></el-input>
      </el-form-item>
      <el-form-item label="APP端引导链接：">
        <el-input placeholder="卡券APP端跳转链接，请尽量填写" v-model="couponsForm.APPLink"></el-input>
      </el-form-item>
      <!-- <el-form-item label="预算阈值：" prop="budgetLimit" ref="budgetLimit">
        <el-input placeholder="必填" v-model="couponsForm.budgetLimit"></el-input>
      </el-form-item> -->
      <el-form-item label="使用率阈值：">
        <el-input v-model="couponsForm.useLimit"></el-input>
        <span class="tips-text">%</span>
      </el-form-item>
      <el-form-item label="余量阈值：" prop="leftLimit" ref="leftLimit">
        <el-input placeholder="必填，1-1000000之间" v-model="couponsForm.leftLimit"></el-input>
      </el-form-item>

    </el-form>

    <div class="btns mar-b-30">
      <el-button type="primary" size="small" :disabled="butDisabled" @click="createCoupons('budgetPrize')">保存并创建使用规则</el-button>
      <el-button type="info" size="small" @click="prevPage">取消</el-button>
    </div>

  </div>
</template>

<script>
import { formatDate } from 'utils/util'
import {
  ShanFuShangHuTemplate,
  ShanFuTongYongTemplate,
  FuKuanMaShangHuTemplate,
  FuKuanMaTongYongTemplate,
  ZhiFuQuanTemplate
} from 'common/template'
import { createCouponPrize, queryPrizeDetail } from 'api/service'
export default {
  name: 'createCoupons',
  data() {
    var validateEndDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入结束时间'))
      } else if (value < this.couponsForm.startDate) {
        return callback(new Error('结束时间只能大于开始时间'))
      } else {
        return callback()
      }
    }
    var validateActiveEndDate = (rule, value, callback) => {
      if (this.couponsForm.activeStartDate) {
        if (!value) {
          return callback(new Error('请输入结束时间'))
        } else if (value <= this.couponsForm.activeStartDate) {
          return callback(new Error('结束时间只能大于开始时间'))
        } else {
          return callback()
        }
      } else {
        return callback()
      }
    }
    return {
      butDisabled: false,
      // 优惠券标题
      createSubTitle: '',
      // 用于修改规则时带入的规则数据
      ruleDataTemplate: {},
      // 用于修改规则时展示的规则模板名
      ruleCodeName: 'rule1',
      // 通用优惠券: '1'
      // 激活优惠券: '2'
      urlType: Number(this.$route.query.type),
      businessTypes: [
        {
          label: '京付通用券',
          value: 'JDPAY_COMMON'
        },
        {
          label: '小金库优惠券',
          value: 'XJK'
        },
        {
          label: '信用卡还款券',
          value: 'CREDIT_CARD_REPAYMENT'
        },
        {
          label: '惠加油优惠券',
          value: 'JDPAY_HUIFUEL_COUPON'
        },
        {
          label: '话费充值优惠券',
          value: 'PHONE_RECHARGE'
        },
        {
          label: '流量充值优惠券',
          value: 'TRAFFIC_RECHARGE'
        },
        {
          label: '付款码优惠券',
          value: 'PAYMENT_CODE'
        },
        {
          label: '扫一扫优惠券',
          value: 'SCAN_CODE'
        },
        {
          label: '闪付优惠券',
          value: 'JD_QUICK_PASS'
        }
      ],
      // 优惠券表单属性
      couponsForm: {
        activeConditions: [],
        activeTimeType: 'FIXED',
        businessType: 'JDPAY_COMMON',
        count: '',
        timeType: 'FIXED',
        startDate: '',
        endDate: '',
        activeStartDate: '',
        activeEndDate: '',
        validDataStartDay: '',
        validDataEndDay: '',
        certificateType: 'SATISFY',
        certificateNum: '',
        certificateDiscount: '',
        certificateNumTop: '',
        certificateNumLow: '',
        ifRecover: true,
        ifTransfer: false,
        // 模板数据
        couponsName: '',
        platform: '',
        description: '',
        howUse: '',
        PCLink: '',
        H5Link: '',
        APPLink: '',
        // budgetLimit: '',
        useLimit: '50',
        leftLimit: ''
      },
      // 规则组标题
      ruleGroupHead: ['规则组'],
      // 规则组数据
      rulesGroup: [
        // 组
        {
          rulesDataList: [
            // 每组数据
            // {
            //   ruleName: '规则组1数据1111',
            //   field: 'tradeAmount',
            //   calType: '大于等于',
            //   calValue: 'n',
            //   extension: '这是扩展值',
            //   errMsg: '订单来源不为： 全球购订单'
            // },
            // {
            //   ruleName: '规则组1数据2222',
            //   field: 'tradeAmount',
            //   calType: '大于等于',
            //   calValue: 'n',
            //   extension: '这是扩展值',
            //   errMsg: '订单来源不为： 全球购订单'
            // }
          ]
        }
      ],
      // 奖品表单规则验证
      couponsFormRules: {
        activeConditions: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个激活条件',
            trigger: 'change'
          }
        ],
        // 多少天生效
        validDataStartDay: [
          {
            required: false,
            message: '只能输入数字',
            pattern: /^\d+$/,
            trigger: 'blur'
          }
        ],
        // 多少天过期
        validDataEndDay: [
          {
            required: false,
            message: '只能输入数字',
            pattern: /^\d+$/,
            trigger: 'blur'
          }
        ],
        // 多少小时过期
        validDataEndHours: [
          {
            required: true,
            message: '只能输入数字',
            pattern: /^\d+$/,
            trigger: 'blur'
          }
        ],
        // 优惠券数量
        count: [
          {
            required: true,
            message: '格式错误，1-1000000000之间的整数',
            pattern: /^([1-9]\d{0,8}?|1000000000)$/,
            trigger: 'blur'
          },
          {
            message: '格式错误，1-1000000000之间的整数',
            pattern: /^([1-9]\d{0,8}?|1000000000)$/,
            min: 1,
            max: 9,
            trigger: 'change'
          }
        ],
        startDate: [{ required: true, message: '请输入开始时间', trigger: 'blur' }],
        endDate: [
          { required: true, validator: validateEndDate, trigger: 'blur' }
        ],
        activeStartDate: [{ required: false, trigger: 'blur' }],
        activeEndDate: [{ validator: validateActiveEndDate, trigger: 'blur' }],
        dynamicType: [
          {
            required: false,
            message: '只能输入数字',
            pattern: /^\d+$/,
            trigger: 'blur'
          }
        ],
        // validDate2: [
        //   { validator: checkValidate2, trigger: 'blur' }
        // ],
        // 优惠券面额
        certificateNum: [
          {
            required: true,
            message:
              '奖品面值不能为空，只能是数字或小数，最多精确到小数点后两位',
            trigger: 'blur'
          },
          {
            message: '格式错误，只能是数字或小数，最多精确到小数点后两位',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        // 折扣
        certificateDiscount: [
          {
            required: true,
            message:
              '必填，只能输入10-100之间的数，最多精确到小数点后两位，折扣金额为交易金额*(1-折扣)，8折即80%',
            pattern: /^([1-9]\d(\.\d{1,2})?|100)$/,
            trigger: 'blur'
          },
          {
            message:
              '必填，只能输入10-100之间的数，最多精确到小数点后两位，折扣金额为交易金额*(1-折扣)，8折即80%',
            pattern: /^([1-9]\d(\.\d{1,2})?|100)$/,
            trigger: 'blur'
          }
        ],
        // 面额上限
        certificateNumTop: [
          {
            required: true,
            message: '面额上限不能为空，奖品面额最大值，最多精确到小数点后两位',
            trigger: 'blur'
          },
          {
            message: '格式错误，奖品面额最大值，最多精确到小数点后两位',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        // 金额使用下限
        certificateNumLow: [
          {
            required: true,
            message:
              '金额使用下限不能为空，使用优惠券的订单最小金额，如不限制请填0',
            trigger: 'blur'
          },
          {
            message: '格式错误，使用优惠券的订单最小金额，如不限制请填0',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        // 优惠券名称
        couponsName: [
          {
            required: true,
            message:
              '优惠券名称不能为空，该名字会用于前端展示及短信发放，限10字以内',
            min: 1,
            max: 10,
            trigger: 'blur'
          }
        ],
        // 适用平台
        platform: [
          {
            required: true,
            message:
              '适用平台不能为空，用于会员中心-卡券展示页面，向用户展示并引导用户使用奖品的平台，可填多个，不建议超过两个',
            trigger: 'blur'
          }
        ],
        // 优惠券描述
        description: [
          {
            required: false,
            message: '可自定义描述，限10个字以内',
            min: 1,
            max: 10,
            trigger: 'blur'
          }
        ],
        // 使用说明
        howUse: [
          {
            required: true,
            message: '使用说明不能为空，用于前端描述，限制100个字',
            min: 1,
            max: 100,
            trigger: 'blur'
          }
        ],
        // 预算阈值
        // budgetLimit: [
        //   {
        //     required: true,
        //     message: '预算阈值不能为空',
        //     trigger: 'blur'
        //   },
        //   {
        //     message: '格式不正确，只能是数字或小数,并且保留2,4位小数',
        //     pattern: /^(\d+)?(?:\.\d{2,4})?$/,
        //     trigger: 'blur'
        //   }
        // ],
        // 余量阈值
        leftLimit: [
          {
            required: true,
            message: '余量阈值不能为空，1-1000000之间',
            trigger: 'blur'
          },
          {
            message: '格式不正确，1-1000000之间',
            pattern: /^[1-9]\d{0,6}$/,
            min: 1,
            max: 7,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  deactivated() {
    this.$destroy(true)
  },
  activated() {
    this.init()
    this.createSubTitle = this.$route.query.type
  },
  methods: {
    init() {
      let prizeId = this.$route.query.prizeId
      // 存在奖品id，说明是修改功能
      if (prizeId) {
        this.queryPrizeDetail(prizeId)
      }
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
          this.couponsForm.businessType = data.bizType
          this.couponsForm.count = data.total
          this.couponsForm.timeType = data.validityType
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

          this.couponsForm.certificateType = data.couponType
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
    /**
     * 创建优惠券
     * @param formName: 指ref属性
     */
    createCoupons(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            this.$message({
              message: '您输入的数据格式有误，请检查',
              type: 'warning'
            })
            return false
          }
          this.butDisabled = true
          this.createPrize()
        })
    },
    // 创建奖品
    createPrize() {
      let reqParams = {
        budgetCode: this.$route.query.code,
        bizType: this.couponsForm.businessType,
        total: this.couponsForm.count,
        validityType: this.couponsForm.timeType,
        validityFromTime: this.couponsForm.startDate || '',
        validityToTime: this.couponsForm.endDate || '',
        validityDelayDays: this.couponsForm.validDataStartDay,
        validityDays: this.couponsForm.validDataEndDay || this.couponsForm.validDataEndHours || '',
        // 小时暂未定义字段
        couponType: this.couponsForm.certificateType,
        amount: this.couponsForm.certificateNum,
        discount: this.couponsForm.certificateDiscount,
        amountCeiling: this.couponsForm.certificateNumTop,
        budgetId: this.$route.query.budgetId,
        orderAmountFloor: this.couponsForm.certificateNumLow,
        // 退款是否恢复
        recoverRefunding: this.couponsForm.ifRecover,
        supportTransfer: this.couponsForm.ifTransfer,
        // 是否需要激活
        needActivate: Number(this.urlType) === 2 ? 'true' : 'false',
        // activeCondition: this.couponsForm.activeConditions,
        // activeType: this.couponsForm.activeTimeType,
        // activeFromTime: this.couponsForm.activfeStartDate,
        // activeToTime: this.couponsForm.activeEndDate,
        // activeDays: this.couponsForm.dynamicType,
        // 模板相关数据
        couponName: this.couponsForm.couponsName,
        platformRestrict: this.couponsForm.platform,
        desc: this.couponsForm.description,
        instructions: this.couponsForm.howUse,
        // amountThreshold: this.couponsForm.budgetLimit,
        useThreshold: this.couponsForm.useLimit,
        threshold: this.couponsForm.leftLimit,
        extendValue: {
          settMod: 'BS',
          procMod: 'NEW',
          '0044': this.couponsForm.PCLink,
          '0045': this.couponsForm.H5Link,
          '0043': this.couponsForm.APPLink,
          // 激活起始有效时间
          '29': this.couponsForm.activeStartDate,
          // 激活结束时间
          '30': this.couponsForm.activeEndDate,
          // 过期天数（转换为分钟数）
          '31': this.couponsForm.dynamicType,
          // 激活时间类型
          // '32': this.couponsForm.activeTimeType,
          // 激活条件
          '33': this.couponsForm.activeConditions.length
            ? this.couponsForm.activeConditions.join(',')
            : ''
        }
      }

      // 激活时间类型(激活优惠券类型时传)
      if (this.urlType === 2) {
        reqParams.extendValue['32'] = this.couponsForm.activeTimeType
      }

      // 存在账户主体传账户主体
      if (this.$route.query.settleConfigId) {
        reqParams.settleConfigId = this.$route.query.settleConfigId
      }

      // 存在prizeId，表示是修改操作
      if (this.$route.query.prizeId) {
        reqParams.couponId = this.$route.query.prizeId
      } else {
        // 预算阈值
        reqParams.amountThreshold = this.$route.query.thresholdAlarm
        // 创建时需要planId,修改不需要
        reqParams.planId = this.$route.query.planId
      }
      // 创建优惠券
      createCouponPrize(reqParams)
        .then(res => {
          this.butDisabled = false
          if (!this.httpThen(this, res)) return
          let data = res.data
          if (res.code === '1') {
            this.$message({
              message: this.$route.query.prizeId ? '修改成功' : '创建成功',
              type: 'success'
            })
            // 跳转创建规则
            this.$router.push({
              path: '/marketingPlanManage/createCouponsRules',
              query: {
                planId: this.$route.query.planId,
                prizeId: data ? data.couponId : this.$route.query.prizeId,
                createRule: '1',
                ruleType: 'generalCoupons'
              }
            })
          }
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    /**
     * 设置奖品模板
     * @param type: ShanFuShangHu、shanfu、baitiao
     */
    setTemplate(type) {
      let template = {
        ShanFuShangHu: ShanFuShangHuTemplate,
        ShanFuTongYong: ShanFuTongYongTemplate,
        FuKuanMaShangHu: FuKuanMaShangHuTemplate,
        FuKuanMaTongYong: FuKuanMaTongYongTemplate,
        ZhiFuQuan: ZhiFuQuanTemplate
      }
      for (let key in template[type]) {
        this.couponsForm[key] = template[type][key]
      }
      // 选择新模板的时候需要清空默认模板的验证
      let clearValidate = [
        'couponsName',
        'platform',
        'description',
        'howUse',
        // 'budgetLimit',
        'leftLimit'
      ]
      clearValidate.forEach((item, index) => {
        this.clearForm(item)
      })
    },
    // 清空验证
    clearForm(formName) {
      this.$refs[formName].clearValidate()
    },
    // select切换时清空展示的数据
    certificateTypeChange() {
      this.couponsForm.certificateNum = ''
      this.couponsForm.certificateDiscount = ''
      this.couponsForm.certificateNumTop = ''
      // this.couponsForm.certificateNumLow = ''
    },
    // 清空有效时间类型
    timeTypeChange() {
      this.couponsForm.startDate = ''
      this.couponsForm.endDate = ''
      this.couponsForm.timeType === 'DYNAMIC' ? this.couponsForm.validDataStartDay = '0' : this.couponsForm.validDataStartDay = ''
      this.couponsForm.validDataEndDay = ''
      this.couponsForm.validDataEndHours = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.add-pocket-money {
  width: 100%;
}
.template-btns {
  margin: 20px 0 20px 130px;
}
.prize-rules-box {
  margin: 40px 10px 30px 130px;
}
.btns {
  margin-left: 130px;
}
</style>
