import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from 'store'
import { LOGIN_URL, treeMenu } from 'common/config'
import { setSessionItem, getSessionItem } from 'utils/util'
import 'nprogress/nprogress.css'

// const NotFound = () => import('pages/common/404')
// const Index = () => import('pages/common/index')
const AppMarketing = () => import('pages/common/appMarketing')
// 营销计划管理
const AllPlan = () => import('pages/marketingPlanManage/allPlan')
// 全部奖品
const AllPrize = () => import('pages/marketingPlanManage/allPrize')
// 创建营销计划
const CreatePlan = () => import('pages/marketingPlanManage/createPlan')
// 查看营销计划白名单
const WhiteUserList = () => import('pages/marketingPlanManage/whiteUser/whiteUserList')
// 营销计划详情
const PlanDetail = () => import('pages/marketingPlanManage/planDetail')

// 审批管理
// 审批代办
const ApproveList = () => import('pages/marketingApproveManage/approveList')
const ApproveBpmList = () => import('pages/marketingApproveManage/bpmList')
const ApproveBpmDefine = () => import('pages/marketingApproveManage/bpmDefine')
const ApproveBpmFunc = () => import('pages/marketingApproveManage/bpmFunc')
const ApproveDepartment = () => import('pages/marketingApproveManage/department')
const ApproveRole = () => import('pages/marketingApproveManage/role')
const ApproveUserRole = () => import('pages/marketingApproveManage/userRole')

// 活动中心
// 无券活动详情(活动详情)
const ActivityDetail = () =>
  import('pages/marketingPlanManage/activityCenter/activityDetail')
// 外部调用发奖活动详情
const ExternalCellPirzeAcDetail = () =>
  import('pages/marketingPlanManage/activityCenter/externalCellPirzeAcDetail')
// 链接领奖活动详情
const LinksPrizeAcDetail = () =>
  import('pages/marketingPlanManage/activityCenter/LinksPrizeAcDetail')

// 创建预算奖品主页
const CreateActivityHome = () =>
  import('pages/marketingPlanManage/activityCenter/createActivityHome')

// 创建奖项信息
const CreateAward = () =>
  import('pages/marketingPlanManage/activityCenter/createAward')

// 创建无券活动
const CreateNoCouponActivity = () =>
  import('pages/marketingPlanManage/activityCenter/createNoCouponActivity')
// 创建外部调用发奖活动-添加奖品
const CreateExtraActivityAddPrize = () =>
  import('pages/marketingPlanManage/activityCenter/createExtraActivityAddPrize')
// 创建外部调用发奖活动-添加礼包
const CreateExtraActivityAddGift = () =>
  import('pages/marketingPlanManage/activityCenter/createExtraActivityAddGift')
// 创建链接领奖活动
const CreateLinkPrizeActivity = () =>
  import('pages/marketingPlanManage/activityCenter/createLinkPrizeActivity')
// 银行领券活动
const CreateBankPrizeActivity = () =>
  import('pages/marketingPlanManage/activityCenter/createBankPrizeActivity')

// 新增京豆
const AddBeijingBean = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/addBeijingBean')
// 新增京券
const AddBeijingTicket = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/addBeijingTicket')
// 新增东券
const AddEastStamps = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/addEastStamps')
// 新增白条券
const AddIousVouchers = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/addIousVouchers')
// 新增外部奖品
const AddOutsidePrize = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/addOutsidePrize')
// 新增实物奖品
const AddPhysicalPrize = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/addPhysicalPrize')
// 新增小金库红包
const AddPocketMoney = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/addPocketMoney')
// 新增券码详情
const CouponCodeDetail = () =>
  import('pages/marketingPlanManage/prizeCenter/notBudgetPrize/couponCodeDetail')
// 创建预算奖品主页
const CreateBudgetHome = () =>
  import('pages/marketingPlanManage/prizeCenter/budgetPrize/createBudgetHome')
// 创建通用优惠券（激活优惠券）
const CreateCoupons = () =>
  import('pages/marketingPlanManage/prizeCenter/budgetPrize/createCoupons')
// 创建奖品规则
const CreateCouponsRules = () =>
  import('pages/marketingPlanManage/prizeCenter/budgetPrize/CreateCouponsRules')
// 创建支付立减
const CreatePayReduce = () =>
  import('pages/marketingPlanManage/prizeCenter/budgetPrize/createPayReduce')
// 营销计划提交审批
const MarketingApproval = () =>
  import('pages/marketingApproveManage/marketingApproval')
// 活动提交审批
const ExaminationApproval = () =>
  import('pages/marketingApproveManage/examinationApproval')
  // 活动提交审批
const ProcessInstance = () =>
  import('pages/marketingApproveManage/processInstance')



// 创建无预算奖品
const NoBudgetPrize = () => import('pages/marketingPlanManage/noBudgetPrize/noBudgetPrizeList')

// 小金库红包
const VaultRedEnvelope = () => import('pages/marketingPlanManage/noBudgetPrize/vaultRedEnvelope')

// 京豆
const MetroplisBean = () => import('pages/marketingPlanManage/noBudgetPrize/metroplisBean')

// 京券
const MetroplisTicket = () => import('pages/marketingPlanManage/noBudgetPrize/metroplisTicket')

// 东券
const EastTicket = () => import('pages/marketingPlanManage/noBudgetPrize/eastTicket')

// 白条券
const IousTicket = () => import('pages/marketingPlanManage/noBudgetPrize/iousTicket')

// 实物奖
const PhysicalPrize = () => import('pages/marketingPlanManage/noBudgetPrize/physicalPrize')

// 第三方奖品
const ThirdPartyPrize = () => import('pages/marketingPlanManage/noBudgetPrize/thirdPartyPrize')
// 模板管理
// const PrizeTemplate = () => import('pages/templateManage/prizeTemplate')
// const ActivityTemplate = () => import('pages/templateManage/activityTemplate')
// const RulesTemplate = () => import('pages/templateManage/rulesTemplate')
// const PageTemplate = () => import('pages/templateManage/pageTemplate')

// // 数据监控
// const ActivityData = () => import('pages/dataMonitoring/activityData')
// const MonitoringData = () => import('pages/dataMonitoring/monitoringData')
// const PlanData = () => import('pages/dataMonitoring/planData')
// const PrizeData = () => import('pages/dataMonitoring/prizeData')

// // 运营工具
// const AftersaleQuery = () => import('pages/operatingTool/aftersaleQuery')
// const BindVouchers = () => import('pages/operatingTool/bindVouchers')
// const Delay = () => import('pages/operatingTool/delay')
// const Recycling = () => import('pages/operatingTool/recycling')

NProgress.configure({ showSpinner: false })

Vue.use(Router)

// 公共路由地址（不需要登录权限）
let routes = [
  {
    name: '',
    path: '',
    redirect: '/index',
    meta: {
      title: '首页',
      permission: 'plan:allPlan:*'
    }
  },
  {
    name: 'index',
    path: '/index',
    component: AppMarketing,
    redirect: '/marketingPlanManage/allPlan',
    meta: {
      title: '首页',
      permission: 'plan:allPlan:*'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../pages/login/login'),
    meta: {
      name: '登录',
      permission: 'plan:allPlan:*'
    }
  },
  {
    // 营销计划管理
    name: 'marketingPlanManage',
    path: '/marketingPlanManage',
    component: AppMarketing,
    redirect: '/marketingPlanManage/allPlan',
    children: [
      {
        // 全部营销计划
        name: 'allPlan',
        path: 'allPlan',
        component: AllPlan,
        meta: {
          type: 'menu',
          title: '营销计划总览',
          permission: 'plan:allPlan:*'
        }
      },
      {
        // 全部营销计划
        name: 'allPrize',
        path: 'allPrize',
        component: AllPrize,
        meta: {
          type: 'menu',
          title: '全部奖品',
          permission: 'plan:allPrize:*'
        }
      },
      {
        // 创建计划页
        name: 'createPlan',
        path: 'createPlan',
        component: CreatePlan,
        meta: {
          title: '创建营销计划',
          permission: 'plan:createPlan:*'
        }
      },
      {
        // 查看计划白名单
        name: 'whiteUserList',
        path: 'whiteUserList',
        component: WhiteUserList,
        meta: {
          title: '创建营销计划白名单',
          permission: 'plan:createPlan:*'
        }
      },
      {
        // 计划详情页
        name: 'planDetail',
        path: 'planDetail',
        component: PlanDetail,
        meta: {
          title: '营销计划详情',
          permission: 'plan:planDetail:*'
        }
      },
      {
        // 创建活动主页
        name: 'createActivityHome',
        path: 'createActivityHome',
        component: CreateActivityHome,
        meta: {
          title: '创建活动',
          permission: 'plan:createActivityHome:*'
        }
      },
      {
        // 创建奖项
        name: 'createAward',
        path: 'createAward',
        component: CreateAward,
        meta: {
          title: '创建奖项',
          permission: 'plan:createAward:*'
        }
      },
      {
        // 创建无券活动
        name: 'createNoCouponActivity',
        path: 'createNoCouponActivity',
        component: CreateNoCouponActivity,
        meta: {
          title: '创建无券活动',
          permission: 'plan:createNoCouponActivity:*'
        }
      },
      {
        // 活动详情
        name: 'activityDetail',
        path: 'activityDetail',
        component: ActivityDetail,
        meta: {
          title: '活动详情',
          permission: 'plan:activityDetail:*'
        }
      },
      {
        // 创建外部调用发奖活动-添加奖品
        name: 'createExtraActivityAddPrize',
        path: 'createExtraActivityAddPrize',
        component: CreateExtraActivityAddPrize,
        meta: {
          title: '创建外部调用发奖活动',
          permission: 'plan:createExtraActivityAddPrize:*'
        }
      },
      {
        // 外部调用发奖活动详情
        name: 'externalCellPirzeAcDetail',
        path: 'externalCellPirzeAcDetail',
        component: ExternalCellPirzeAcDetail,
        meta: {
          title: '活动详情',
          permission: 'plan:externalCellPirzeAcDetail:*'
        }
      },
      {
        // 创建外部调用发奖活动-添加礼包
        name: 'createExtraActivityAddGift',
        path: 'createExtraActivityAddGift',
        component: CreateExtraActivityAddGift,
        meta: {
          title: '创建活动',
          permission: 'plan:createExtraActivityAddGift:*'
        }
      },
      {
        // 创建链接领奖活动
        name: 'createLinkPrizeActivity',
        path: 'createLinkPrizeActivity',
        component: CreateLinkPrizeActivity,
        meta: {
          title: '创建活动',
          permission: 'plan:createLinkPrizeActivity:*'
        }
      },
      {
        // 银行领券活动
        name: 'createBankPrizeActivity',
        path: 'createBankPrizeActivity',
        component: CreateBankPrizeActivity,
        meta: {
          title: '创建活动',
          permission: 'plan:createBankPrizeActivity:*'
        }
      },
      {
        // 链接领奖活动详情
        name: 'linksPrizeAcDetail',
        path: 'linksPrizeAcDetail',
        component: LinksPrizeAcDetail,
        meta: {
          title: '活动详情',
          permission: 'plan:linksPrizeAcDetail:*'
        }
      },
      {
        // 新增京豆
        name: 'addBeijingBean',
        path: 'addBeijingBean',
        component: AddBeijingBean,
        meta: {
          title: '新增京豆',
          permission: 'plan:addBeijingBean:*'
        }
      },
      {
        // 新增京券
        name: 'addBeijingTicket',
        path: 'addBeijingTicket',
        component: AddBeijingTicket,
        meta: {
          title: '新增京券',
          permission: 'plan:addBeijingTicket:*'
        }
      },
      {
        // 新增东券
        name: 'addEastStamps',
        path: 'addEastStamps',
        component: AddEastStamps,
        meta: {
          title: '新增东券',
          permission: 'plan:addEastStamps:*'
        }
      },
      {
        // 新增白条券
        name: 'addIousVouchers',
        path: 'addIousVouchers',
        component: AddIousVouchers,
        meta: {
          title: '新增白条券',
          permission: 'plan:addIousVouchers:*'
        }
      },
      {
        // 新增外部奖品
        name: 'addOutsidePrize',
        path: 'addOutsidePrize',
        component: AddOutsidePrize,
        meta: {
          title: '新增外部奖品',
          permission: 'plan:addOutsidePrize:*'
        }
      },
      {
        // 新增实物奖品
        name: 'addPhysicalPrize',
        path: 'addPhysicalPrize',
        component: AddPhysicalPrize,
        meta: {
          title: '新增实物奖品',
          permission: 'plan:addPhysicalPrize:*'
        }
      },
      {
        // 新增小金库红包
        name: 'addPocketMoney',
        path: 'addPocketMoney',
        component: AddPocketMoney,
        meta: {
          title: '新增小金库红包',
          permission: 'plan:addPocketMoney:*'
        }
      },
      {
        // 新增券码详情
        name: 'couponCodeDetail',
        path: 'couponCodeDetail',
        component: CouponCodeDetail,
        meta: {
          title: '新增券码详情',
          permission: 'plan:couponCodeDetail:*'
        }
      },
      {
        // 创建预算奖品主页
        name: 'createBudgetHome',
        path: 'createBudgetHome',
        component: CreateBudgetHome,
        meta: {
          title: '创建预算奖品',
          permission: 'plan:createBudgetHome:*'
        }
      },
      {
        // 创建通用优惠券
        name: 'createCoupons',
        path: 'createCoupons',
        component: CreateCoupons,
        meta: {
          title: '创建通用优惠券',
          permission: 'plan:CreateCoupons:*'
        }
      },
      {
        // 创建奖品规则
        name: 'createCouponsRules',
        path: 'createCouponsRules',
        component: CreateCouponsRules,
        meta: {
          title: '创建奖品规则',
          permission: 'plan:createCouponsRules:*'
        }
      },
      {
        // 创建支付立减
        name: 'createPayReduce',
        path: 'createPayReduce',
        component: CreatePayReduce,
        meta: {
          title: '创建支付立减',
         
          permission: 'plan:createPayReduce:*'
        }
      },
      {
        // 创建无预算奖品
        name: 'NoBudgetPrize',
        path: 'noBudgetPrize',
        component: NoBudgetPrize,
        meta: {
          title: '创建无预算奖品',
          permission: 'plan:*:*'
        }
      },
      {
        // 小金库红包
        name: 'VaultRedEnvelope',
        path: 'vaultRedEnvelope',
        component: VaultRedEnvelope,
        meta: {
          title: '创建小金库红包',
          permission: 'plan:*:*'
        }
      },
      {
        // 京豆
        name: 'MetroplisBean',
        path: 'metroplisBean',
        component: MetroplisBean,
        meta: {
          title: '创建京豆',
          permission: 'plan:*:*'
        }
      },
      {
        // 京券
        name: 'MetroplisTicket',
        path: 'metroplisTicket',
        component: MetroplisTicket,
        meta: {
          title: '创建京券',
          permission: 'plan:*:*'
        }
      },
      {
        // 东券
        name: 'EastTicket',
        path: 'eastTicket',
        component: EastTicket,
        meta: {
          title: '创建京券',
          permission: 'plan:*:*'
        }
      },
      {
        // 白条券
        name: 'IousTicket',
        path: 'iousTicket',
        component: IousTicket,
        meta: {
          title: '创建白条券',
          permission: 'plan:*:*'
        }
      },
      {
        // 实物奖
        name: 'PhysicalPrize',
        path: 'physicalPrize',
        component: PhysicalPrize,
        meta: {
          title: '创建白条券',
          permission: 'plan:*:*'
        }
      },
      {
        // 第三方奖品
        name: 'ThirdPartyPrize',
        path: 'thirdPartyPrize',
        component: ThirdPartyPrize,
        meta: {
          title: '创建外部奖品',
          permission: 'plan:*:*'
        }
      }
      
    ]
  },

  {
    // 审批管理
    name: 'marketingApproveManage',
    path: '/marketingApproveManage',
    component: AppMarketing,
    redirect: '/marketingApproveManage/approveList',
    children: [
      {
        // 活动审批
        name: 'examinationApproval',
        path: 'examinationApproval',
        component: ExaminationApproval,
        meta: {
          title: '活动审批',
          permission: 'plan:planDetail:*'
        }
      },
      {
        // 营销审批
        name: 'marketingApproval',
        path: 'marketingApproval',
        component: MarketingApproval,
        meta: {
          title: '营销计划审批',
          permission: 'plan:planDetail:*'
        }
      },
      {
        // 审批代办
        name: 'approveList',
        path: 'approveList',
        component: ApproveList,
        meta: {
          type: 'menu',
          title: '审批待办',
          permission: 'approve:*:*'
        }
      },
      {
        // 流程查询
        name: 'bpmList',
        path: 'bpmList',
        component: ApproveBpmList,
        meta: {
          type: 'menu',
          title: '流程查询',
          permission: 'approve:*:*'
        }
      },
      {
        // 流程定义
        name: 'bpmDefine',
        path: 'bpmDefine',
        component: ApproveBpmDefine,
        meta: {
          type: 'menu',
          title: '流程定义',
          permission: 'approve:*:*'
        }
      },
      {
        // 流程实例
        name: 'instance',
        path: 'instance',
        component: ProcessInstance,
        meta: {
          type: 'menu',
          title: '流程实例',
          permission: 'approve:*:*'
        }
      },
      {
        // 流程功能
        name: 'bpmFunc',
        path: 'bpmFunc',
        component: ApproveBpmFunc,
        meta: {
          type: 'menu',
          title: '流程功能',
          permission: 'approve:*:*'
        }
      },
      {
        // 部门管理
        name: 'department',
        path: 'department',
        component: ApproveDepartment,
        meta: {
          type: 'menu',
          title: '部门管理',
          permission: 'approve:*:*'
        }
      },
      {
        // 角色管理
        name: 'role',
        path: 'role',
        component: ApproveRole,
        meta: {
          type: 'menu',
          title: '角色管理',
          permission: 'approve:*:*'
        }
      },
      {
        // 用户角色
        name: 'userRole',
        path: 'userRole',
        component: ApproveUserRole,
        meta: {
          type: 'menu',
          title: '用户角色',
          permission: 'approve:*:*'
        }
      }]
  },
  {
    path: '/error/404',
    component: () => import('../pages/common/404'),
    meta: {
      title: '404',
      permission: 'notFound:404:*'
    }
  },
  {
    name: 'notFound',
    path: '*',
    component: () => import('../pages/common/404'),
    permission: 'notFound:404:*'
  }
]

// 权限路由，根据服务端返回（暂时写在这个地方）
let permissionsRouter = [
  {
    // 模板管理
    name: 'templateManage',
    path: '/templateManage',
    component: () => import('../pages/common/appMarketing'),
    redirect: '/templateManage/PrizeTemplate',
    children: [
      {
        name: 'prizeTemplate',
        path: 'prizeTemplate',
        component: () => import('../pages/templateManage/PrizeTemplate'),
        meta: {
          title: '市场营销平台-奖品模板',
          permission: ['add', 'create']
        }
      },
      {
        name: 'activityTemplate',
        path: 'activityTemplate',
        component: () => import('../pages/templateManage/activityTemplate')
      },
      {
        name: 'rulesTemplate',
        path: 'rulesTemplate',
        component: () => import('../pages/templateManage/rulesTemplate')
      },
      {
        name: 'pageTemplate',
        path: 'pageTemplate',
        component: () => import('../pages/templateManage/pageTemplate')
      }
    ]
  },
  {
    // 数据监控
    name: 'dataMonitoring',
    path: '/dataMonitoring',
    component: () => import('../pages/common/appMarketing'),
    redirect: '/dataMonitoring/activityData',
    children: [
      {
        name: 'activityData',
        path: 'activityData',
        component: () => import('../pages/dataMonitoring/activityData')
      },
      {
        name: 'monitoringData',
        path: 'monitoringData',
        component: () => import('../pages/dataMonitoring/monitoringData')
      },
      {
        name: 'planData',
        path: 'planData',
        component: () => import('../pages/dataMonitoring/planData')
      },
      {
        name: 'prizeData',
        path: 'prizeData',
        component: () => import('../pages/dataMonitoring/prizeData')
      }
    ]
  },
  {
    // 运营工具
    name: 'operatingTool',
    path: '/operatingTool',
    component: () => import('../pages/common/appMarketing'),
    redirect: '/operatingTool/aftersaleQuery',
    children: [
      {
        name: 'aftersaleQuery',
        path: 'aftersaleQuery',
        component: () => import('../pages/operatingTool/aftersaleQuery')
      },
      {
        name: 'bindVouchers',
        path: 'bindVouchers',
        component: () => import('../pages/operatingTool/bindVouchers')
      },
      {
        name: 'delay',
        path: 'delay',
        component: () => import('../pages/operatingTool/delay')
      },
      {
        name: 'recycling',
        path: 'recycling',
        component: () => import('../pages/operatingTool/recycling')
      }
    ]
  }
]

const router = new Router({
  routes,
  mode: 'hash'
})

router.addRoutes(permissionsRouter)

// 获取的用户权限(暂时使用mock数据)
// const PERMISSIONS = {
//   notFound: ['notFound:*:*'],
//   cleaning: ['cleaning:*:*'],
//   plan: ['plan:*:*', 'plan:create:*'],
//   basic: ['basic:*:*'],
//   merchant: ['merchant:*:*'],
//   realm: [
//     'realm:res:view',
//     'realm:user:delete',
//     'realm:role:create',
//     'realm:role:update',
//     'realm:res:update',
//     'realm:res:create',
//     'realm:role:view',
//     'realm:res:*',
//     'realm:*:*',
//     'realm:role:*',
//     'realm:role:delete',
//     'realm:user:*',
//     'realm:user:view',
//     'realm:role:assign',
//     'realm:res:delete',
//     'realm:user:assign'
//   ],
//   prize: ['prize:*:*'],
//   crm: ['crm:*:*'],
//   activity: ['activity:*:*'],
//   bpm: ['bpm:*:*']
// }

/**
 * data.permissions: 权限列表
 * data.pathPermissions: 访问路径配置的权限
 */
function matchPermissions(data, callBack) {
  // 权限级别
  let level = 3
  var isPermission = false
  let permissions = data.permissions
  let pathPermissions = data.pathPermissions
  let prefixStr = pathPermissions
    ? pathPermissions.split(':')[0]
    : 'undefined:*:*'

  console.log('开始比对权限')
  if (permissions[prefixStr]) {
    let arr = permissions[prefixStr]
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      // 第一次优先匹配两个*号的权限（所有权限）
      // if (item.split(':').length === 3 && item.match(/\*/g) && item.match(/\*/g).length === 2) {
      if (
        // 3级
        item.split(':').length === level && arr.includes(prefixStr + ':*:*')
      ) {
        // 找不到匹配，删除
        if (pathPermissions.indexOf(item.split(':')[0]) === -1) {
          // console.log('35:remove')
          // el.parentNode.removeChild(el)
          isPermission = false
          break
        } else {
          isPermission = true
          // console.log('找着了' + pathPermissions)
          break
        }
      } else if (item.split(':').length >= level) {
        // 2级

        // 如果第一次找着了
        if (arr.includes(pathPermissions)) {
          isPermission = true
          break
        }
        // 首先寻找当前传入的权限
        if (!arr.includes(pathPermissions)) {
          // 找不到传入的权限，意味着权限中间可能会出现*:*的字符，继续寻找是否包含*:*两个星的存在，若都不存在，表示该权限确实已经没有，进行删除元素
          if (!arr.includes(prefixStr + ':*:*')) {
            // el.parentNode && el.parentNode.removeChild(el)
            isPermission = false
            break
          } else {
            isPermission = true
            break
          }
        }
      }
    }
  }
  isPermission = true
  callBack && callBack(isPermission)
}

// 取缓存路由
let routeList = getSessionItem('j_mk_breadcrumb') || []

/**
 * 路由访问控制
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  /**
   * 1.获取用户登录状态
   * 2.登录状态访问页面，需要对用户进行权限判断， 有权限跳，否则不跳转
   * 3.登录状态访问登录页，直接跳转至登录后跳转的首页地址
   * 4.未登录状态访问页面时，可根据情况对不需要权限验证的访问路径直接做跳转
   */
  function toPath(isPermissions) {
    // 获取权限状态跳转
    if (!isPermissions) {
      next({
        path: '/error/404',
        // replace: true,
        query: {
          returnUrl: encodeURIComponent(window.location.href)
        }
      })
    } else {
      console.log('有权限')
      document.title = to.meta.title
      document.querySelector('title').innerText = to.meta.title
      if (to.path === '/login') {
        window.location.href = LOGIN_URL
        // next({path: '/', replace: true})
      } else {
        next()
      }
    }
  }

  // mock登录
  let isLogin = !false
  if (isLogin) {
    // 面包屑导航
    if (to.name === 'allPlan') {
      // 默认首页清空浏览记录
      routeList = []
    } else if (to.path.split('/')[0] !== from.path.split('/')[0]) {
      // 父级路由不相同，表示切换了菜单，清空浏览记录
      routeList = []
    } else if (to.meta.type === 'menu') {
      // 点击的左侧菜单，清空浏览记录
      routeList = []
    }
    var index = -1
    for (var i = 0; i < routeList.length; i++) {
      if (routeList[i].name === to.meta.title) {
        index = i
        break
      }
    }
    if (index !== -1) {
      // 如果存在路由列表，则把之后的路由都删掉
      routeList.splice(index + 1, routeList.length - index - 1)
    } else {
      routeList.push({ name: to.meta.title, path: to.fullPath })
    }
    to.meta.routeList = routeList

    // 缓存面包屑导航数据
    setSessionItem('j_mk_breadcrumb', routeList)

    // 登录状态，做权限比对
    // undefined为404页面

    // 缓存菜单
    if (!store.state.isLogin) {
      treeMenu().then(res => {
        // 添加404页面权限
        res.permissions.notFound = ['notFound:*:*']
        store.dispatch('setPermissions', res.permissions)
        store.dispatch('setMenuList', res.menus)
        store.dispatch('setIsLogin', true)

        // console.log(res.permissions)
        // console.log(store.state.menuList)

        matchPermissions(
          {
            permissions: res.permissions,
            pathPermissions: to.meta.permission
          },
          function(isPermissions) {
            toPath(isPermissions)
          }
        )
      }).catch((err) => {
        console.log(err)
      })
    } else {
      console.log('缓存..')
      // 走缓存
      matchPermissions(
        {
          permissions: store.state.permissions,
          pathPermissions: to.meta.permission
        },
        function(isPermissions) {
          toPath(isPermissions)
        }
      )
    }
  } else {
    /**
     * 未登录（此处代码适用于系统不走统一登录而设定）
     * 这里会有一个beforeEach循环的漏洞，即使在未登录状态，通过路由访问/login时都会进入到beforeEach中
     * 如果一直采用next({path: '/login', replace: true})会一直进入到beforeEach中，所以需要加to.path对路径进行判断
     * to.path === '/login' 退出循环的关键
     */
    if (to.path === '/login') {
      // next() 原则上跳转系统登录，实际跳转erp登录
      window.location.href = LOGIN_URL
    } else {
      // 原则上跳转系统登录，实际跳转erp登录
      window.location.href = LOGIN_URL
      // next({path: '/login', replace: true})
    }
    NProgress.done()
  }
})

// 结束Progress
router.afterEach(() => {
  NProgress.done()
})

export default router
