import store from 'store'
import { findMenuList } from 'api/service'
// 正式上线环境
/* export const LOGIN_URL =
  process.env.NODE_ENV === 'production'
    ? '//ssa.jd.com/sso/login?ReturnUrl=' +
      encodeURIComponent(window.location.href)
    : '//ssa.jd.com/sso/login?ReturnUrl=' +
      encodeURIComponent(window.location.href) */

// 退出登录跳转地址配置正式环境
/* export const LOGIN_OUT_URL =
  process.env.NODE_ENV === 'production'
    ? '//ssa.jd.com/sso/login?ReturnUrl=//mk-op.jd.com/start/index.html'
    : '//ssa.jd.com/sso/login?ReturnUrl=//mk-op.jd.com/start/index.html' */
// 测试环境
export const LOGIN_URL =
  process.env.NODE_ENV === 'production'
    ? '//test.ssa.jd.com/sso/login?ReturnUrl=' +
      encodeURIComponent(window.location.href)
    : '//test.ssa.jd.com/sso/login?ReturnUrl=' +
     encodeURIComponent(window.location.href)

// 退出登录跳转地址配置测试环境
export const LOGIN_OUT_URL =
  process.env.NODE_ENV === 'production'
    ? '//test.ssa.jd.com/sso/login?ReturnUrl=//mk-op.jd.com/#/marketingPlanManage/allPlan'
    : '//test.ssa.jd.com/sso/login?ReturnUrl=//mk-op.jd.com/#/marketingPlanManage/allPlan'


// 营销计划状态
export const PLAN_STATUS = {
  'AUDITED': '已审核',
  'AUDITING': '审核中',
  'UNAUDITED': '未审核'
}

// 营销计划目标
export const PLAN_TARGETS = {
  'JDPAYNEW': '京东支付新用户',
  'JDQUICKPASSNEW': '京东闪付新用户',
  'JDQRCODENEW': '京东码付新用户'
}

// 营销计划部门
export const PLAN_DEPARTMENTS = {
  'ALL': '全部',
  'JDPAY': '京东支付业务部',
  'CONSUMER_FINANCE': '消费者金融部',
  'FORTUNE_MANAGE': '财务管理部'
}

// 计划目标类型
export const PLANTARGET_TYPE = {
  'USER': '用户',
  'TRANSACTION_AMOUNT': '交易额',
  'ORDER_QUANTITY': '订单量'
}

export const PLANTARGET_REVERT = {
  '用户': 'USER',
  '交易额': 'TRANSACTION_AMOUNT',
  '订单量': 'ORDER_QUANTITY'
}

// 活动状态枚举
export const ACTIVITY_STATUS = {
  'EDITING': '编辑中',
  'AUDITING': '待审核',
  'AUDITING_FAIL': '审核不通过',
  'AUDITED': '审核通过',
  'PRE_ONLINE': '预上线',
  'TEST_PASS': '测试通过',
  'TEST_FAIL': '测试不通过',
  'ONLINE_AUDITING': '上线审核中',
  'ONLINE_FAIL': '上线审核不通过',
  'ONLINE': '已上线',
  'PAUSE': '暂停',
  'OFFLINE': '已结束'
}

// 奖品类别枚举
export const PRIZE_CATEGORY = {
  'COUPON': '优惠券',
  'REDUCTION': '立减',
  'INTER_PRIZE': '接口奖品',
  'PHYSICAL_PRIZE': '实物奖品',
  // 查询奖品详情页的枚举
  'SATISFY': '满减',
  'DISCOUNT': '折扣减',
  'RANDOM': '随机减',
  'PROBABILITY': '概率减'
}

// 优惠券奖品类别枚举
export const COUPON_PRIZE_CATEGORY = {
  'SATISFY': '满减券',
  'DISCOUNT': '折扣券'
}

// 计算类型枚举
export const COMPUTED_TYPE = {
  '>=': '大于等于',
  '>': '大于',
  '==': '等于',
  '<': '小于',
  '<=': '小于等于'
}

// 奖品数据流程枚举
export const AUDIT_STATUS = {
  'REVIEW_WAIT': '编辑中',
  'REVIEW': '待审核',
  'REVIEW_BACK': '审批打回',
  'REVIEW_SUCCESS': '审核通过',
  'REVIEW_FAIL': '审核不通过'
}

// 状态枚举
export const STATUS = {
  'ON': '启用',
  'OFF': '停用'
}

// 奖项类型
export const AWARDS_TYPE = {
  'SINGLE_PRIZE': '单个奖品',
  'PRIZE_BAG': '单个礼包',
  'POOL_SINGLE_PRIZE': '抽奖（无礼包）',
  'POOL_BAG_PRIZE': '抽奖（礼包）',
  // 中文转英文
  '单个奖品': 'SINGLE_PRIZE',
  '单个礼包': 'PRIZE_BAG',
  '抽奖（无礼包）': 'POOL_SINGLE_PRIZE',
  '抽奖（礼包）': 'POOL_BAG_PRIZE'
}

// 活动产品类型
export const PRODUCT_TYPES = {
  'JDPAY02': '在线支付',
  'JDPAY02SYS': '自营扫一扫',
  'JDPAY02FKM': '自营付款码',
  'JDPAY02QP': '京东闪付',
  'UNPQRSCAN': '银联扫一扫',
  'UNPQRPAY': '银联付款码',
  'AGENTREC': '代扣'
}

// 接口奖品类型
export const INTER_PRIZE_TYPE = {
  'XFA': '小金库固定面额',
  'XOP': '小金库订单金额比例',
  'XRA': '小金库随机金额',
  'XPB': '小金库概率',
  'JFA': '京豆固定面额',
  'JOP': '京豆订单金额比例',
  'JRA': '京豆随机金额',
  'JPB': '京豆概率',
  'DONG_QUAN': '东券',
  'BAI_TIAO': '白条券',
  'LFA': '理财券固定面额',
  'LOP': '理财券订单金额比例'
}
// 业务类型枚举
export const BUSINESS_TYPE = {
  'JDPAY_COMMON': '京付通用券',
  'XJK': '小金库优惠券',
  'CREDIT_CARD_REPAYMENT': '信用卡还款券',
  'JDPAY_HUIFUEL_COUPON': '惠加油优惠券',
  'PHONE_RECHARGE': '话费充值优惠券',
  'TRAFFIC_RECHARGE': '流量充值优惠券',
  'PAYMENT_CODE': '付款码优惠券',
  'SCAN_CODE': '扫一扫优惠券',
  'JD_QUICK_PASS': '闪付优惠券'
}
//  有效时间类型枚举
export const TIME_TYPE = {
  'FIXED': '固定',
  'DYNAMIC': '动态',
  'HOUR': '小时'
}
//  优惠券类型枚举
export const CERTIFICATE_TYPE = {
  'SATISFY': '满减券',
  'DISCOUNT': '折扣券'
}
//  激活时间类型枚举
export const ACTIVITY_TIME_TYPE = {
  'FIXED': '固定',
  'DYNAMIC': '动态'
}
//  立减类型枚举
export const REDUCE_TYPE = {
  'SATISFY': '满减',
  'DISCOUNT': '折扣减',
  'RANDOM': '随机减',
  'PROBABILITY': '概率减'
}
// 白名单用户类型
export const USER_VALUE_TYPE = {
  '2': '手机号',
  '3': 'PIN'
}

// 星期
export const WEEK_ARR = {
  '1': '星期一',
  '2': '星期二',
  '3': '星期三',
  '4': '星期四',
  '5': '星期五',
  '6': '星期六',
  '7': '星期天'
}

// 规则名称维护
export const RULES_NAMES = {
  'tradeAmount': '订单金额限制',
  'newSkuLimit': '商城订单品类/SKU限制',
  'venderIdLimit': '商城订单所属店铺ID限制',
  'provinceLimit': '商城订单收货地址省级限制',
  'cityLimit': '商城订单收货地址市级限制',
  'skuCategoryLimit': '商城订单自营/POP限制',
  'jdpayOrderSource': '商城订单客户端来源限制',
  'orderSendPay': '商城订单类型限制',
  'oscOrderSkuLimit': '商城OSC拆单品类/SKU限制',
  'orderType': '金融订单业务类型限制',
  'merchantId': '金融订单业务类型限制',
  'outSkuLimit': '外部商户订单SKU限制',
  'whiteMerchantLimit': '商户标签限制',
  'pi': '支付PI限制',
  'productType': '支付产品限制',
  'bankCode': '银行卡编码',
  'cardType': '银行卡类型',
  'bankCardNoPre': '银行卡bin',
  'isBindCard': '银行卡绑卡状态分类',
  'newBindCard': '银行领券引导绑卡限制规则',
  'jdPayCustomerPotential': '京东支付新老用户',
  'silentUsers': '用户最后一次使用京东支付时间',
  'quickPassUserActivate': '京东闪付激活用户限制',
  'xjkAccount': '小金库新老用户',
  'isRealNamed': '京东金融实名用户',
  'isPlusUser': '京东会员PLUS',
  'baiTiaoUserLimit': '白条用户分类',
  'jcaiLimit': '金采用户分类',
  'isPaymentCodeNewUser': '付款码新老用户限制',
  'jdO2ONewUser': '京东到家新老用户限制',
  'dataCenterUserTagLimit': '数据部人群ID',
  'isJrAppFirstLoginTimeValid': '用户首次登录金融APP时间限制',
  'merchantNo': '商户号限制',
  '外部规则': '外部规则',
  'crowdfundingNewUser': '众筹用户类型',
  'jrUserLevel': '金融会员类型',
  'goldNewUser': '黄金用户类型',
  'jdUserScore': '商城会员京享值',
  'baoXianTiE': '保险提额可用',
  'baoXianZengXian': '赠险可用'
}

// 规则对应的规则模板名称
export const RULES_NAME = {
  'tradeAmount': 'rule1',
  'newSkuLimit': 'rule2',
  'venderIdLimit': 'rule12',
  'provinceLimit': 'rule14',
  'cityLimit': 'rule15',
  'skuCategoryLimit': 'rule16',
  'jdpayOrderSource': 'rule17',
  'orderSendPay': 'rule18',
  'oscOrderSkuLimit': 'rule19',
  'orderType': 'rule20',
  'merchantId': 'rule20',
  'outSkuLimit': 'rule21',
  'whiteMerchantLimit': 'rule22',
  'pi': 'rule23',
  'productType': 'rule24',
  'bankCode': 'rule25',
  'cardType': 'rule26',
  'bankCardNoPre': 'rule27',
  'isBindCard': 'rule28',
  'newBindCard': 'rule29',
  'jdPayCustomerPotential': 'rule30',
  'silentUsers': 'rule31',
  'quickPassUserActivate': 'rule32',
  'xjkAccount': 'rule33',
  'isRealNamed': 'rule34',
  'isPlusUser': 'rule35',
  'baiTiaoUserLimit': 'rule36',
  'jcaiLimit': 'rule37',
  'isPaymentCodeNewUser': 'rule38',
  'jdO2ONewUser': 'rule39',
  'dataCenterUserTagLimit': 'rule40',
  'isJrAppFirstLoginTimeValid': 'rule41',
  'merchantNo': 'rule42',
  '外部规则': 'rule43',
  'crowdfundingNewUser': 'rule45',
  'jrUserLevel': 'rule46',
  'goldNewUser': 'rule47',
  'jdUserScore': 'rule48',
  'baoXianTiE': 'rule49',
  'baoXianZengXian': 'rule50'
}

// 奖品查询枚举
export const PLAN_HAVE_POST = {
  'WIN_PRIZE': '中奖',
  'HAVE_ADDRESS': '地址已填',
  'HAVE_POST': '已发奖'
}

/**
 * 规则分类
 */
// 无券活动规则父类
export const NO_COUPON_ACTIVITY_RULES_PARENT = [
  {
    label: '全部规则',
    value: 1
  },
  {
    label: '商城订单规则',
    value: 2
  },
  {
    label: '外部商户规则',
    value: 3
  },
  {
    label: '支付工具规则',
    value: 4
  },
  {
    label: '银行卡规则',
    value: 5
  },
  {
    label: '用户事实规则',
    value: 6
  },
  // 二期规则
  // {
  //   label: '用户参加活动次数限制',
  //   value: 7
  // },
  {
    label: '其它',
    value: 8
  }
]
// 无券活动规则子类
export const NO_COUPON_ACTIVITY_RULES_CHILD = [
  {
    ruleId: '1.1',
    label: '订单金额限制',
    value: 'rule1',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.2',
    label: '商城订单品类/SKU限制',
    value: 'rule2',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.3',
    label: '商城订单所属店铺ID限制',
    value: 'rule12',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.4',
    label: '商城订单收货地址省级限制',
    value: 'rule14',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.5',
    label: '商城订单收货地址市级限制',
    value: 'rule15',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.6',
    label: '商城订单自营/POP限制',
    value: 'rule16',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.7',
    label: '商城订单客户端来源限制',
    value: 'rule17',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.8',
    label: '商城订单类型限制',
    value: 'rule18',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.9',
    label: '商城OSC拆单品类/SKU限制',
    value: 'rule19',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.10',
    label: '金融订单业务类型限制',
    value: 'rule20',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.11',
    label: '外部商户订单SKU限制',
    value: 'rule21',
    selectClass: [1, 3]
  },
  {
    ruleId: '1.12',
    label: '商户标签限制',
    value: 'rule22',
    selectClass: [1, 3]
  },
  {
    ruleId: '1.13',
    label: '支付PI限制',
    value: 'rule23',
    selectClass: [1, 4]
  },
  {
    ruleId: '1.14',
    label: '支付产品限制',
    value: 'rule24',
    selectClass: [1, 4]
  },
  {
    ruleId: '1.15',
    label: '银行卡编码',
    value: 'rule25',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.16',
    label: '银行卡类型',
    value: 'rule26',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.17',
    label: '银行卡bin',
    value: 'rule27',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.18',
    label: '银行卡绑卡状态分类',
    value: 'rule28',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.20',
    label: '京东支付新老用户',
    value: 'rule30',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.21',
    label: '用户最后一次使用京东支付时间',
    value: 'rule31',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.22',
    label: '京东闪付激活用户限制',
    value: 'rule32',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.23',
    label: '小金库新老用户',
    value: 'rule33',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.24',
    label: '京东金融实名用户',
    value: 'rule34',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.25',
    label: '京东会员PLUS',
    value: 'rule35',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.26',
    label: '白条用户分类',
    value: 'rule36',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.27',
    label: '金采用户分类',
    value: 'rule37',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.28',
    label: '付款码新老用户限制',
    value: 'rule38',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.29',
    label: '京东到家新老用户限制',
    value: 'rule39',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.30',
    label: '数据部人群ID',
    value: 'rule40',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.31',
    label: '用户首次登录金融APP时间限制',
    value: 'rule41',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.32',
    label: '商户号限制',
    value: 'rule42',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.33',
    label: '外部规则',
    value: 'rule43',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.35',
    label: '众筹用户类型',
    value: 'rule45',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.36',
    label: '金融会员类型',
    value: 'rule46',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.37',
    label: '黄金用户类型',
    value: 'rule47',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.38',
    label: '商城会员京享值',
    value: 'rule48',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.39',
    label: '保险提额可用',
    value: 'rule49',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.40',
    label: '赠险可用',
    value: 'rule50',
    selectClass: [1, 8]
  }
]



// 外部调用发奖活动父类
export const EXTRA_ACTIVITY_PARENT = [
  {
    label: '全部规则',
    value: 1
  },
  {
    label: '商城订单规则',
    value: 2
  },
  {
    label: '银行卡规则',
    value: 5
  },
  {
    label: '用户事实规则',
    value: 6
  },
  {
    label: '其它',
    value: 8
  }
]
// 外部调用发奖活动子类
export const EXTRA_ACTIVITY_CHILD = [
  {
    ruleId: '1.1',
    label: '订单金额限制',
    value: 'rule1',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.2',
    label: '商城订单品类/SKU限制',
    value: 'rule2',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.3',
    label: '商城订单所属店铺ID限制',
    value: 'rule12',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.4',
    label: '商城订单收货地址省级限制',
    value: 'rule14',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.5',
    label: '商城订单收货地址市级限制',
    value: 'rule15',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.6',
    label: '商城订单自营/POP限制',
    value: 'rule16',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.7',
    label: '商城订单客户端来源限制',
    value: 'rule17',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.8',
    label: '商城订单类型限制',
    value: 'rule18',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.9',
    label: '商城OSC拆单品类/SKU限制',
    value: 'rule19',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.18',
    label: '银行卡绑卡状态分类',
    value: 'rule28',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.20',
    label: '京东支付新老用户',
    value: 'rule30',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.21',
    label: '用户最后一次使用京东支付时间',
    value: 'rule31',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.22',
    label: '京东闪付激活用户限制',
    value: 'rule32',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.23',
    label: '小金库新老用户',
    value: 'rule33',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.24',
    label: '京东金融实名用户',
    value: 'rule34',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.25',
    label: '京东会员PLUS',
    value: 'rule35',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.26',
    label: '白条用户分类',
    value: 'rule36',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.27',
    label: '金采用户分类',
    value: 'rule37',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.28',
    label: '付款码新老用户限制',
    value: 'rule38',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.29',
    label: '京东到家新老用户限制',
    value: 'rule39',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.30',
    label: '数据部人群ID',
    value: 'rule40',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.31',
    label: '用户首次登录金融APP时间限制',
    value: 'rule41',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.33',
    label: '外部规则',
    value: 'rule43',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.35',
    label: '众筹用户类型',
    value: 'rule45',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.36',
    label: '金融会员类型',
    value: 'rule46',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.37',
    label: '黄金用户类型',
    value: 'rule47',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.38',
    label: '商城会员京享值',
    value: 'rule48',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.39',
    label: '保险提额可用',
    value: 'rule49',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.40',
    label: '赠险可用',
    value: 'rule50',
    selectClass: [1, 8]
  }
]



// 优惠券使用规则父类
export const COUPONS_PARENT = [
  {
    label: '全部规则',
    value: 1
  },
  {
    label: '商城订单规则',
    value: 2
  },
  {
    label: '外部商户规则',
    value: 3
  },
  {
    label: '支付工具规则',
    value: 4
  },
  {
    label: '银行卡规则',
    value: 5
  },
  {
    label: '用户事实规则',
    value: 6
  },
  {
    label: '其它',
    value: 8
  }
]
// 优惠券使用规则子类
export const COUPONS_CHILD = [
  {
    ruleId: '1.1',
    label: '订单金额限制',
    value: 'rule1',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.2',
    label: '商城订单品类/SKU限制',
    value: 'rule2',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.3',
    label: '商城订单所属店铺ID限制',
    value: 'rule12',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.4',
    label: '商城订单收货地址省级限制',
    value: 'rule14',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.5',
    label: '商城订单收货地址市级限制',
    value: 'rule15',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.6',
    label: '商城订单自营/POP限制',
    value: 'rule16',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.7',
    label: '商城订单客户端来源限制',
    value: 'rule17',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.8',
    label: '商城订单类型限制',
    value: 'rule18',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.9',
    label: '商城OSC拆单品类/SKU限制',
    value: 'rule19',
    selectClass: [1, 2]
  },
  {
    ruleId: '1.10',
    label: '金融订单业务类型限制',
    value: 'rule20',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.12',
    label: '商户标签限制',
    value: 'rule22',
    selectClass: [1, 3]
  },
  {
    ruleId: '1.13',
    label: '支付PI限制',
    value: 'rule23',
    selectClass: [1, 4]
  },
  {
    ruleId: '1.14',
    label: '支付产品限制',
    value: 'rule24',
    selectClass: [1, 4]
  },
  {
    ruleId: '1.15',
    label: '银行卡编码',
    value: 'rule25',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.16',
    label: '银行卡类型',
    value: 'rule26',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.18',
    label: '银行卡绑卡状态分类',
    value: 'rule28',
    selectClass: [1, 5]
  },
  {
    ruleId: '1.20',
    label: '京东支付新老用户',
    value: 'rule30',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.21',
    label: '用户最后一次使用京东支付时间',
    value: 'rule31',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.22',
    label: '京东闪付激活用户限制',
    value: 'rule32',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.23',
    label: '小金库新老用户',
    value: 'rule33',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.24',
    label: '京东金融实名用户',
    value: 'rule34',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.25',
    label: '京东会员PLUS',
    value: 'rule35',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.26',
    label: '白条用户分类',
    value: 'rule36',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.27',
    label: '金采用户分类',
    value: 'rule37',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.28',
    label: '付款码新老用户限制',
    value: 'rule38',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.29',
    label: '京东到家新老用户限制',
    value: 'rule39',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.30',
    label: '数据部人群ID',
    value: 'rule40',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.31',
    label: '用户首次登录金融APP时间限制',
    value: 'rule41',
    selectClass: [1, 6]
  },
  {
    ruleId: '1.32',
    label: '商户号限制',
    value: 'rule42',
    selectClass: [1, 8]
  },
  {
    ruleId: '1.33',
    label: '外部规则',
    value: 'rule43',
    selectClass: [1, 8]
  }
]

// 券码生成状态
export const COUPONS_STATUS = {
  'GENERATE_SUCCESS': '生成成功',
  'GENERATE_FAIL': '生成失败',
  'DOWNLOADED': '已下载'
}

// 左侧菜单数据
export const treeMenu = function (params) {
  return new Promise((resolve, reject) => {
    findMenuList()
      .then(res => {
        // 只要能执行到这个过程就表示已经登录，非登录在fetch.js中处理
        store.dispatch('setIsLogin', true)
        store.dispatch('setUserInfo', {
          userName: res.realName,
          erp: res.erp
        })
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
