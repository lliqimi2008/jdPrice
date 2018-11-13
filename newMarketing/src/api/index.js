// export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '//be.jd.com:8080'
// 上线版本
// export const BASE_URL = '//mk-portal.jd.com' // 生产环境
// 测试版本
export const BASE_URL = '//be.jd.com:8080' // 测试环境

// 退出登录
export const LOGIN_OUT = '/rest/system/menu/logout'

// 获取菜单权限
export const FIND_MENU_LIST = '/rest/system/menu/findMenuList'

// 预算编码查询总额和名称
export const QUERY_BY_CODE = '/rest/budget/queryByCode'

// 创建预算奖品
export const CREATE_BUDGET_PRIZE = '/rest/budget/create'

// 查询奖品列表
export const QUERY_PRIZE_LIST = '/rest/prize/coupon/search'

// 删除预算奖品
export const DELETE_BUDGET_PRIZE = '/rest/prize/coupon/delete'

// 查询预算奖品详情
export const QUERY_PRIZE_DETAIL = '/rest/prize/coupon/detail'

// 查询无预算奖品详情
export const QUERY_NOBUDGET_PRIZE_DETAIL = '/rest/prize/nobudget/detail'

// 查询预算立减奖品详情
export const QUERY_REDUCTION_DETAIL = '/rest/prize/reduction/detail'

// 查看奖品库存
export const QUERY_PRIZE_INVENTORY = '/rest/prize/coupon/getStock'

// 启用
export const ENABLE_PRIZE = '/rest/prize/coupon/enable'

// 停用
export const DISABLE_PRIZE = '/rest/prize/coupon/disable'

// 根据营销计划id查询预算信息
export const QUERY_BUDGET_INFO = '/rest/budget/queryByPlanId'

// 账户主体列表
export const QUERY_ACCOUNT_SUBJECT = '/rest/budget/queryAccountSubject'

// 查询活动列表
export const QUERY_ACTIVITY_LIST = '/rest/activity/queryByPlanId'

// 删除活动id
export const DELETE_ACTIVITY_ID = '/rest/activity/deleteByActivityId'

// 创建优惠券奖品
export const CREATE_COUPON_PRIZE = '/rest/prize/coupon/create'

// 创建支付立减优惠券
export const CREATE_REDUCTION_PRIZE = '/rest/prize/reduction/create'

// 礼包数据查询
export const QUERY_GIFT_BAG_LIST = '/rest/activity/bag/queryByPlanId'

// 创建礼包时弹窗中查询奖品列表
export const QUERY_PRIZE_PLANID_LIST = '/rest/activity/bag/listPrizeByPlanId'

// 创建礼包
export const CREATE_GIFT_BAG = '/rest/activity/bag/create'

// 删除礼包
export const DELETE_GIFT_BAG = '/rest/activity/bag/delete'

// 修改礼包
export const EDIT_GIFT_BAG = '/rest/activity/bag/modify'

// 创建规则
export const CREATE_RULE = '/rest/rule/create'

// 删除规则
export const DELETE_RULE = '/rest/rule/deleteByRuleId'

// 删除规则组
export const DELETE_RULE_GROUP = '/rest/rule/deleteRuleGroup'

// 删除奖项下的规则组
export const DELETE_AWARDS_RULE_GROUP = '/rest/rule/deleteRuleByAwardId'

// 修改规则
export const UPDATE_RULE = '/rest/rule/modify'

// 查询活动下规则组
export const SEARCH_RULE_GROUP = '/rest/rule/searchAsGroupByActivityId'

// 根据奖品id查询规则（用于创建奖品或修改奖品时使用）
export const SEARCH_RULE = '/rest/rule/searchRuleByPrizeId'

// 新增无预算奖品（小金库红包、京豆、东券、白条券接口）
export const CREATE_NOT_ZBUDGET_PRIZE = '/rest/prize/inter/create'

// 营销计划总览 条件查询活动总览
export const ALLPLAN_TOTALACTIVITY = '/rest/activity/overview/search'

// 营销计划总览 获取营销计划基本信息通过ID
export const ALLPLAN_CHECKPLANBYID = '/rest/plan/view'

// 营销计划总览 删除营销计划
export const ALLPLAN_DELETEPLAN = '/rest/plan/delete'

// 营销计划总览 搜索营销计划列表
export const ALLPLAN_SEARCHPLANLIST = '/rest/plan/search'

// 新建营销计划页 保存计划
export const CREATEPLAN_SAVEPLAN = '/rest/plan/create'

// 新建营销计划页 修改计划
export const CREATEPLAN_MODIFYPLAN = '/rest/plan/modify'

// 创建无券活动
export const CREATE_NOCOUPON_ACTIVITY = '/rest/activity/reduction/create'

// 修改时查看无券活动
export const QUERY_NOCOUPON_ACTIVITY = '/rest/activity/reduction/view'

// 修改无券活动
export const UPDATE_NOCOUPON_ACTIVITY = '/rest/activity/reduction/modify'

// 创建外部调用发奖活动
export const CREATE_OUTSIDE_CALLS_ACTIVITY = '/rest/activity/inter/create'

// 修改时查看外部调用发奖活动
export const QUERY_OUTSIDE_CALLS_ACTIVITY = '/rest/activity/inter/view'

// 修改外部调用发奖活动
export const UPDATE_OUTSIDE_CALLS_ACTIVITY = '/rest/activity/inter/modify'

// 创建链接领奖活动
export const CREATE_LINK_PRIZE_ACTIVITY = '/rest/activity/pageTake/create'

// 修改时查看链接领奖活动
export const QUERY_LINK_PRIZE_ACTIVITY = '/rest/activity/pageTake/view'

// 修改链接领奖活动
export const UPDATE_LINK_PRIZE_ACTIVITY = '/rest/activity/pageTake/modify'

// 查看活动详情
export const QUERY_ACTIVITY_DETAIL = '/rest/activity/queryByActivityId'

// 创建奖项
export const CREATE_AWARDS = '/rest/activity/awards/create'

// 删除奖项
export const DELETE_AWARDS = '/rest/activity/awards/delete'

// 修改奖项
export const UPDATE_AWARDS = '/rest/activity/awards/modify'

// 奖项下创建奖品的奖品列表查询页
export const QUERY_AWARDS_LIST = '/rest/activity/awards/queryPrizeByPlanId'

// 奖项下创建礼包的礼包列表查询页
export const QUERY_GIFT_LIST = '/rest/activity/awards/queryBagByPlanId'

// 根据奖项id查询规则
export const QUERY_AWARDS_GET_LIMIT = '/rest/rule/searchRuleByAwardId'

// 规则上下排序
export const SORT_RULES = '/rest/rule/operationPriority'
// 审批管理
// 审批代办--用户代办任务列表查询
export const APPROVE_DATA_LIST = '/rest/bpm/task'

// 审批代办--跟踪
export const APPROVE_DIAGRAM_APPROVAL = '/resource/diagram'

// 流程定义查询
export const APPROVE_BPM_PD = 'rest/bpm/pd'

// 流程定义-删除
export const APPROVE_BPM_DEFINE_DEL = 'rest/bpm/pd/deploy/delete'

// 当前登录流程查询
export const APPROVE_BPM_LIST = '/rest/bpm/pi/my'

// 超管流程查询
export const SUPER_APPROVE_BPM_LIST = '/rest/bpm/pi'

// 部门管理
export const APPROVE_DEPARTMENT_SEARCHALL = '/rest/department/searchAll'

// 删除部门
export const APPROVE_DEPARTMENT_DEL = '/rest/department/delete'

// 部门管理--修改
export const APPROVE_DEPARTMENT_UPDATE = '/rest/department/create'

// 角色管理--查询所有角色
export const APPROVE_ROLE_LIST = '/rest/bpm/group'


// 角色管理--修改
export const APPROVE_ROLE_UPDATE = '/rest/bpm/group/modify'

// 角色管理--删除
export const APPROVE_ROLE_DEL = '/rest/bpm/group/delete'

// 角色管理--创建
export const APPROVE_ROLE_CREATE = '/rest/bpm/group/create'

// 代办任务--签收任务
export const APPROVE_TASK_CLAIM = '/rest/bpm/task/claim'

// 代办任务--办理任务
export const APPROVE_TASK_DEAL = '/rest/bpm/task/deal'
// 代办任务--办理任务
export const APPROVE_PROCESS_DEAL = '/rest/bpm/pi/instanceDetail'

// 代办任务--跟踪
export const APPROVE_DIAGRAM_ACTUAL = 'rest/bpm/resource/diagram/actual'

// 代办任务--审批提交
export const APPROVE_TASK_COMPLETE = '/rest/bpm/task/complete'


// 金融优惠券
// 查询所有超品类
export const ALL_CATEGORY = 'rest/licai/load/allCategory'

// 查询品类信息
export const CATEGORY_INFO = '/rest/licai/load/info'

// 查询小品类属性值
export const SMALL_CATEGORY_VALUE = '/rest/licai/load/smallCategoryValue'

// 保存优惠券信息
export const SAVE_FINANCE_COUPON = 'rest/licai/addCoupon'

// 修改优惠券信息
export const UPDATE_FINANCE_COUPON = '/rest/licai/updateCoupon'

// 查询优惠券详情
export const FIND_CATEGORY_DETAIL = 'rest/licai/detail'


// 流程定义
export const APPROVE_BPM_DEFINE_LIST = '/rest/plan/search'

// 流程功能
export const APPROVE_BPM_FUNC_LIST = '/rest/plan/search'
// 流程功能--创建
export const APPROVE_BPM_FUNC_CREATE = '/rest/bpmfunc/create'
// 流程功能--修改
export const APPROVE_BPM_FUNC_UPDATE = '/rest/bpmfunc/update'
// 流程功能--删除
export const APPROVE_BPM_FUNC_DEL = '/rest/bpmfunc/del'
// 部门管理
export const APPROVE_DEPARTMENT_LIST = '/rest/plan/search'
// 部门管理--修改
export const APPROVE_DEPARTMENT_MODIFY = '/rest/department/modify'



// 用户角色
export const APPROVE_USERROLE_LIST = '/rest/plan/search'

// 用户角色--获取部门
export const APPROVE_USERROLE_DEPART = '/rest/userrole/findDepart'
// 用户角色--获取角色列表
export const APPROVE_USERROLE_ROLELIST = '/rest/userrole/findRoleList'
// 用户角色--获取用户角色
export const APPROVE_USERROLE_ROLE = '/rest/userrole/findRole'
// 创建白名单
export const CREATE_WHITE_USER = '/rest/whiteUser/create'
// 查询白名单
export const SEARCH_WHITE_USER_LIST = '/rest/whiteUser/search'
// 删除白名单
export const DELETE_WHITE_USER = '/rest/whiteUser/delete'
// 发起计划审批流程（预上线）
export const LAUNCH_PLAN_APPROVE = '/rest/bpm/plan/preOnlineStart'
// 发起活动审批流程（上线）
export const LAUNCH_ACTIVITY_APPROVE = 'rest/bpm/activity/onlineProcessStart'
// 修改活动状态为预上线
export const CHANGE_TO_PREONLINE = 'rest/bpm/activity/preOnline'
// 修改活动状态为测试通过
export const CHANGE_TO_TEST_PASS = 'rest/bpm/activity/testPass'
// 修改活动状态为测试不通过
export const CHANGE_TO_TEST_FAIL = 'rest/bpm/activity/testFail'
// 修改活动状态为暂停
export const CHANGE_TO_PAUSE = 'rest/bpm/activity/pause'
// 修改活动状态为下线
export const CHANGE_TO_OFFLINE = 'rest/bpm/activity/offline'

// 用户角色--查询所有用户
export const APPROVE_USER_SEACHLIST = '/rest/bpm/user/searchUserList'
// 用户角色--分配
export const APPROVE_USERROLE_ASSIGN = '/rest/bpm/user/assign'
// 用户角色-- 根据用户ID查询角色及部门
export const APPROVE_USER_SEACHUID = '/rest/bpm/user/searchByUserId'
// 修改计划下所有内容审核状态，除上线活动及其使用的奖品
export const CHANGE_ALL_STATUS_BY_PLAN = '/rest/bpm/plan/changeAuditStatusByPlanId'
// 运营功能--奖品查询
export const OPERATION_PRIZE_FIND = 'rest/jrcoupon/query'
// 运营功能--奖品详情
export const OPERATION_PRIZE_DETAIL_FIND = 'rest/jrcoupon/showDetails'
// 运营功能--券码查询
export const OPERATION_CODE_FIND = 'rest/jrcoupon/cdKeyQuery'


// 无预算奖品
export const NO_BUDGET_AWARD = '/rest/prize/nobudget/createInter'

// 无预算-实物
export const NO_BUDGET_CREATEPHY = '/rest/prize/nobudget/createPhysical'

// 无预算奖品-第三方/rest/prize/nobudget/createThird
export const NO_BUDGET_CREATETHIRD = '/rest/prize/nobudget/createThird'

// 无预算奖品查询
export const NO_BUDGET_SEARCH = '/rest/prize/nobudget/search'

// 无预算奖品启用
export const NO_BUDGET_ENABLE = '/rest/prize/nobudget/enable'

// 无预算奖品停用
export const NO_BUDGET_DISABLE = '/rest/prize/nobudget/disable'

// 无预算奖品查看库存
export const NO_BUDGET_GETSTOCK = '/rest/prize/nobudget/getStock'

// 无预算奖品删除
export const NO_BUDGET_BUDDELETE = '/rest/prize/nobudget/delete'

// 无预算奖品导入外部券码查数据
export const NO_BUDGET_THIRDLIST = '/rest/prize/nobudget/searchThirdPrizeList'
// 业务标识
export const PLANBIZIDF_LIST = '/rest/planBizIdf/searchFuzzily'
// 新增业务标识
export const PLANBIZIDF_CREATE = '/rest/planBizIdf/create'
// 编辑业务标识
export const PLANBIZIDF_MODIFY = '/rest/planBizIdf/modify'
// 删除业务标识
export const PLANBIZIDF_DELETE = '/rest/planBizIdf/delete'
// 计划目标
export const PLANTARGET_LIST = '/rest/planTarget/searchFuzzily'
// 新增计划目标
export const PLANTARGET_CREATE = '/rest/planTarget/create'
// 修改计划目标
export const PLANTARGET_MODIFY = '/rest/planTarget/modify'
// 删除计划目标
export const PLANTARGET_DELETE = '/rest/planTarget/delete'
// 计划部门
export const PLANDEPARTMENT_LIST = '/rest/planDepartment/search'
// 新增计划部门
export const PLANDEPARTMENT_CREATE = '/rest/planDepartment/create'
// 修改计划部门
export const PLANDEPARTMENT_MODIFY = '/rest/planDepartment/modify'
// 计划部门详情
export const PLANDEPARTMENT_DETAIL = '/rest/planDepartment/detail'
// 计划部门启用
export const PLANDEPARTMENT_ENABLE = '/rest/planDepartment/enable'
// 计划部门停用
export const PLANDEPARTMENT_DISABLE = '/rest/planDepartment/disable'
// 关系解绑
export const PLANDEPARTMENT_DISBAND = '/rest/planDepartment/deleteRelate'


// 无预算奖品导入外部券码连接
export const NO_BUDGET_UPLOADFILE = '/rest/prize/nobudget/uploadFileToDB'

// 无预算奖品券码详情
export const NO_BUDGET_INSTANCELIST = '/rest/prize/nobudget/prizeInstanceList'

// 无预算奖品券码详情搜索
export const NO_BUDGET_SEARCHINSTANCE = '/rest/prize/nobudget/searchPrizeInstance'

// 无预算奖品回显数据
export const NO_BUDGET_SEARCHDETAIL = '/rest/prize/nobudget/detail'

// 无预算奖品 小金库修改
export const NO_BUDGET_MODIFYINTER = '/rest/prize/nobudget/modifyInter'

// 无预算奖品 第三方修改
export const NO_BUDGET_MODIFYTHIRD = '/rest/prize/nobudget/modifyThird'

// 无预算奖品 实物库修改
export const NO_BUDGET_MODIFYPHYSICAL = '/rest/prize/nobudget/modifyPhysical'

// 手动绑券
export const NEW_BIND_LIST = '/rest/prize/manualCoupon/newBindList'

// 手动绑券-查看
export const NEW_BIND_DETAILSLIST = '/rest/prize/manualCoupon/newBindDetailsList'

// 查询可生成兑换码的活动
export const QUERY_CDKEY_ACTIVITY = 'rest/cdkey/queryCdkeyActivity'
// 生成兑换码
export const CREATE_CDKEY = 'rest/cdkey/generateCdkey'
// 查询兑换码生成记录
export const QUERY_CDKEY_RECORD = 'rest/cdkey/viewCdkeyRecord'
// 下载兑换码
export const DOWNLOAD_CDKEY = 'rest/cdkey/downloadCdkey'

// 后返活动-创建
export const CREATE_RETURN_ACTIVITY = 'rest/activity/payAfter/create'
// 后返活动-更新
export const UPDATE_RETURN_ACTIVITY = 'rest/activity/payAfter/modify'
// 后返活动-修改
export const QUERY_RETURN_ACTIVITY = 'rest/activity/payAfter/view'

// 运营功能--活动兑换码查询
export const OPERATION_ACTIVITY_CODE_FIND = 'rest/cdkey/queryCdkeyDetail'

// 查询所有计划部门
export const SEARCH_ALL_DEPT = '/rest/planDepartment/searchAll'
// 根据部门查询计划目标
export const SEARCH_TARGET_BY_DEPT_ID = '/rest/planTarget/searchByDeptId'
// 根据计划查询计划目标
export const SEARCH_TARGET_BY_PALN_ID = '/rest/planTarget/searchByPlanId'
// 根据计划查询业务标识
export const SEARCH_BIZ_TYPE_BY_PLAN_ID = '/rest/planBizIdf/searchByPlanId'



// 手动绑券 - 上传文件内容
export const NEW_BIND_BINDBYFILE = '/rest/prize/manualCoupon/bindByFile'

// 手动绑券 - 手动上传文件中内容
export const NEW_BIND_BINDBYTEXT = '/rest/prize/manualCoupon/bindByText'

// 奖品是否可编辑
export const PRIZE_IS_ALLOW_EDIT = '/rest/prize/isAllowEdit'
// 奖品是否可编辑
export const ACTIVITY_IS_ALLOW_EDIT = '/rest/activity/isAllowEdit'

// 查询奖品券的可用库存
export const COUPONS_IS_GETSTOCK = '/rest/prize/coupon/getStock'

// 生成奖品兑换码
export const COUPONS_IS_GENERATEPRIZE = '/rest/cdkey/prize/generatePrizeCdkey'

// 查询兑换码的生成记录
export const COUPONS_IS_QUERYCDKEY = '/rest/cdkey/prize/queryCdkeyRecord'

// 下载兑换码
export const COUPONS_IS_DOWNLOAD = '/rest/cdkey/prize/downloadCdkey'


// 奖品操作查询--查询券的可用库存
export const OPERATE_IS_SEARCH = '/rest/prizeInstanceOperate/search'

// 奖品操作查询--费用结算主体查询
export const OPERATE_IS_GETSETTLECONFIG = '/rest/prizeInstanceOperate/getSettleConfig'

// 奖品操作查询--操作类型查询
export const OPERATE_IS_GETOPERATETYPE = '/rest/prizeInstanceOperate/getOperateTypes'

// 奖品操作查询--奖品类型查询
export const OPERATE_IS_GETPRIZECATEGORY = '/rest/prizeInstanceOperate/getPrizeCategorys'

// 实物中奖查询--实物奖品中奖查询
export const PHYSICAL_IS_SEARCH = '/rest/prizePhysical/search'

// 实物中奖查询--获取实物奖品状态
export const PHYSICAL_IS_GETPHYSICALSTATUS = '/rest/prizePhysical/getPhysicalStatus'

// 实物中奖查询--发奖
export const PHYSICAL_IS_AWARDSINGLEPRIZE = '/rest/prizePhysical/awardSinglePrize'

// 实物中奖查询--导出数据
export const PHYSICAL_IS_EXPORT = '/rest/prizePhysical/export'
