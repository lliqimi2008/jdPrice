/**
 * 接口请求的方法名
 */
import fetch from '../common/fetch'
import * as api from './index'

// 退出登录
export const loginOut = (params) => fetch(api.LOGIN_OUT, params, 'post')

// 菜单权限
export const findMenuList = (params) => fetch(api.FIND_MENU_LIST, params, 'get')

// 预算编码查询总额和名称
export const queryByCode = (params) => fetch(api.QUERY_BY_CODE, params, 'post')

// 创建预算奖品
export const createBudgetPrize = (params) => fetch(api.CREATE_BUDGET_PRIZE, params, 'post')

// 查询奖品列表
export const queryPrizeList = (params) => fetch(api.QUERY_PRIZE_LIST, params, 'post')

// 删除预算奖品
export const deleteBudgetPrize = (params) => fetch(api.DELETE_BUDGET_PRIZE, params, 'post')

// 查询预算奖品信息
export const queryPrizeDetail = (params) => fetch(api.QUERY_PRIZE_DETAIL, params, 'post')

// 查询无预算奖品信息
export const queryNobudgetPrizeDetail = (params) => fetch(api.QUERY_NOBUDGET_PRIZE_DETAIL, params, 'post')

// 查询预算立减奖品详情
export const queryReductionDetail = (params) => fetch(api.QUERY_REDUCTION_DETAIL, params, 'post')

// 查看奖品库存
export const queryPrizeInventory = (params) => fetch(api.QUERY_PRIZE_INVENTORY, params, 'post')

// 启用
export const enablePrize = (params) => fetch(api.ENABLE_PRIZE, params, 'post')

// 停用
export const disablePrize = (params) => fetch(api.DISABLE_PRIZE, params, 'post')

// 根据营销计划id查询预算信息
export const queryBudgetInfo = (params) => fetch(api.QUERY_BUDGET_INFO, params, 'post')

// 账户主体列表
export const queryAccountSubject = (params) => fetch(api.QUERY_ACCOUNT_SUBJECT, params, 'post')

// 查询活动列表
export const queryActivityList = (params) => fetch(api.QUERY_ACTIVITY_LIST, params, 'post')

// 删除活动id
export const deleteActivityId = (params) => fetch(api.DELETE_ACTIVITY_ID, params, 'post')

// 创建优惠券奖品
export const createCouponPrize = (params) => fetch(api.CREATE_COUPON_PRIZE, params, 'post')

// 创建支付立减优惠券
export const createReductionPrize = (params) => fetch(api.CREATE_REDUCTION_PRIZE, params, 'post')

// 礼包数据查询
export const queryGiftBagList = (params) => fetch(api.QUERY_GIFT_BAG_LIST, params, 'post')

// 创建礼包时弹窗中查询奖品列表
export const queryPrizePlanIdList = (params) => fetch(api.QUERY_PRIZE_PLANID_LIST, params, 'post')

// 创建礼包
export const createGiftBag = (params) => fetch(api.CREATE_GIFT_BAG, params, 'post')

// 删除礼包
export const deleteGiftBag = (params) => fetch(api.DELETE_GIFT_BAG, params, 'post')

// 修改礼包
export const editGiftBag = (params) => fetch(api.EDIT_GIFT_BAG, params, 'post')

// 创建规则
export const createRule = (params) => fetch(api.CREATE_RULE, params, 'post')

// 删除规则
export const deleteRule = (params) => fetch(api.DELETE_RULE, params, 'post')

// 删除规则组
export const deleteRuleGroup = (params) => fetch(api.DELETE_RULE_GROUP, params, 'post')

// 删除奖项下的规则组
export const deleteAwardsRuleGroup = (params) => fetch(api.DELETE_AWARDS_RULE_GROUP, params, 'post')

// 修改规则
export const updateRule = (params) => fetch(api.UPDATE_RULE, params, 'post')

// 查询活动下规则组
export const searchRuleGroup = (params) => fetch(api.SEARCH_RULE_GROUP, params, 'post')

// 查询规则
export const searchRule = (params) => fetch(api.SEARCH_RULE, params, 'post')

// 营销计划总览 搜索营销计划列表
export const allPlanSearchPlanList = (params) => fetch(api.ALLPLAN_SEARCHPLANLIST, params, 'post')

// 营销计划总览 获取营销计划基本信息通过ID
export const allPlanCheckPlanById = (params) => fetch(api.ALLPLAN_CHECKPLANBYID, params, 'post')

// 营销计划总览 删除营销计划
export const allPlanDeletePlan = (params) => fetch(api.ALLPLAN_DELETEPLAN, params, 'post')

// 新增无预算奖品（小金库红包、京豆、东券、白条券接口）
export const createNotZbudgetPrize = (params) => fetch(api.CREATE_NOT_ZBUDGET_PRIZE, params, 'post')

// 营销计划总览 条件查询活动总览
export const allPlanTotalActivity = (params) => fetch(api.ALLPLAN_TOTALACTIVITY, params, 'post')

// 新建营销计划页 保存计划
export const createPlanSavePlan = (params) => fetch(api.CREATEPLAN_SAVEPLAN, params, 'post')

// 新建营销计划页 修改计划
export const createPlanModifyPlan = (params) => fetch(api.CREATEPLAN_MODIFYPLAN, params, 'post')

// 修改时查看无券活动
export const queryNocouponActivity = (params) => fetch(api.QUERY_NOCOUPON_ACTIVITY, params, 'post')

// 创建无券活动
export const createNoCouponActivity = (params) => fetch(api.CREATE_NOCOUPON_ACTIVITY, params, 'post')

// 修改无券活动
export const updateNoCouponActivity = (params) => fetch(api.UPDATE_NOCOUPON_ACTIVITY, params, 'post')

// 创建外部调用发奖活动
export const createOutsideCallsActivity = (params) => fetch(api.CREATE_OUTSIDE_CALLS_ACTIVITY, params, 'post')

// 修改时查看外部调用发奖活动
export const queryQutsideCallsActivity = (params) => fetch(api.QUERY_OUTSIDE_CALLS_ACTIVITY, params, 'post')

// 修改外部调用发奖活动
export const updateOutsideCallsActivity = (params) => fetch(api.UPDATE_OUTSIDE_CALLS_ACTIVITY, params, 'post')

// 创建链接领奖活动
export const createLinkPrizeActivity = (params) => fetch(api.CREATE_LINK_PRIZE_ACTIVITY, params, 'post')

// 修改时查看链接领奖活动
export const queryLinkPrizeActivity = (params) => fetch(api.QUERY_LINK_PRIZE_ACTIVITY, params, 'post')

// 修改链接领奖活动
export const updateLinkPrizeActivity = (params) => fetch(api.UPDATE_LINK_PRIZE_ACTIVITY, params, 'post')

// 查看活动详情
export const queryActivityDetail = (params) => fetch(api.QUERY_ACTIVITY_DETAIL, params, 'post')

// 创建奖项
export const createAwards = (params) => fetch(api.CREATE_AWARDS, params, 'post')

// 删除奖项
export const deleteAwards = (params) => fetch(api.DELETE_AWARDS, params, 'post')

// 修改奖项
export const updateAwards = (params) => fetch(api.UPDATE_AWARDS, params, 'post')

// 奖项下创建奖品的奖品列表查询页
export const queryAwardsList = (params) => fetch(api.QUERY_AWARDS_LIST, params, 'post')

// 奖项下创建礼包的礼包列表查询页
export const queryGiftList = (params) => fetch(api.QUERY_GIFT_LIST, params, 'post')

// 根据奖项id查询规则
export const queryAwardsGetList = (params) => fetch(api.QUERY_AWARDS_GET_LIMIT, params, 'post')

// 规则排序
export const sortRules = (params) => fetch(api.SORT_RULES, params, 'post')

// 金融优惠券
// 查询所有超品类
export const findAllCategory = (params) => fetch(api.ALL_CATEGORY, params, 'post')

// 查询品类信息
export const findCategoryInfo = (params) => fetch(api.CATEGORY_INFO, params, 'get')

// 查询小品类属性值
export const findSmallCategoryValue = (params) => fetch(api.SMALL_CATEGORY_VALUE, params, 'get')

// 保存优惠券信息
export const saveFinanceCoupon = (params) => fetch(api.SAVE_FINANCE_COUPON, params, 'post')

// 修改优惠券信息
export const updateFinanceCoupon = (params) => fetch(api.UPDATE_FINANCE_COUPON, params, 'post')

// 查询优惠券详情
export const findCategoryDetail = (params) => fetch(api.FIND_CATEGORY_DETAIL, params, 'get')


// 审批管理
// 数据列表
export const approveSearchList = (params) => (fetch(api.APPROVE_DATA_LIST, params, 'post'))

// 流程跟踪

export const approveDiagramApproval = (params) => (fetch(api.APPROVE_DIAGRAM_APPROVAL, params, 'get'))
// 流程定义查询APPROVE_BPM_PD
export const approveBpmPd = (params) => (fetch(api.APPROVE_BPM_PD, params, 'post'))
// 流程定义--删除
export const approveBpmDefineDel = (params) => (fetch(api.APPROVE_BPM_DEFINE_DEL, params, 'post'))
// 流程查询
export const approveBpmList = (params) => (fetch(api.APPROVE_BPM_LIST, params, 'post'))
// 超管流程查询
export const superApproveBpmList = (params) => (fetch(api.SUPER_APPROVE_BPM_LIST, params, 'post'))
// 部门管理
export const approveDeparmentSearchall = (params) => (fetch(api.APPROVE_DEPARTMENT_SEARCHALL, params, 'post'))
// 部门管理--修改
export const approveDepartmentUpdate = (params) => (fetch(api.APPROVE_DEPARTMENT_UPDATE, params, 'post'))
// 角色管理--创建
export const approveRoleCreate = (params) => (fetch(api.APPROVE_ROLE_CREATE, params, 'post'))
// 代办任务--签收任务
export const approveTaskClaim = (params) => (fetch(api.APPROVE_TASK_CLAIM, params, 'post'))
// 代办任务--办理任务
export const approveTaskDeal = (params) => (fetch(api.APPROVE_TASK_DEAL, params, 'post'))
// 流程详情
export const searchProcessByInstanceId = (params) => (fetch(api.APPROVE_PROCESS_DEAL, params, 'post'))
// 代办任务--跟踪
export const approveDiagramActual = (params) => (fetch(api.APPROVE_DIAGRAM_ACTUAL, params, 'post'))
// 代办任务--审批提交
export const approveTaskComplete = (params) => (fetch(api.APPROVE_TASK_COMPLETE, params, 'post'))




// 流程定义
export const approveBpmDefineList = (params) => (fetch(api.APPROVE_BPM_DEFINE_LIST, params, 'post'))

// 流程功能
export const approveBpmFuncList = (params) => (fetch(api.APPROVE_BPM_FUNC_LIST, params, 'post'))
// 流程功能--创建
export const approveBpmFuncCreate = (params) => (fetch(api.APPROVE_BPM_FUNC_CREATE, params, 'post'))
// 流程功能--修改
export const approveBpmFuncUpdate = (params) => (fetch(api.APPROVE_BPM_FUNC_UPDATE, params, 'post'))
// 流程功能--删除
export const approveBpmFuncDel = (params) => (fetch(api.APPROVE_BPM_FUNC_DEL, params, 'post'))
// 部门管理
export const approveDepartmentList = (params) => (fetch(api.APPROVE_DEPARTMENT_LIST, params, 'post'))
// 部门管理--修改
export const approveDepartmentModify = (params) => (fetch(api.APPROVE_DEPARTMENT_MODIFY, params, 'post'))

// 部门管理--删除
export const approveDepartmentDel = (params) => (fetch(api.APPROVE_DEPARTMENT_DEL, params, 'post'))
// 角色管理
export const approveRoleList = (params) => (fetch(api.APPROVE_ROLE_LIST, params, 'post'))
// 角色管理--修改
export const approveRoleUpdate = (params) => (fetch(api.APPROVE_ROLE_UPDATE, params, 'post'))
// 角色管理--删除
export const approveRoleDel = (params) => (fetch(api.APPROVE_ROLE_DEL, params, 'post'))
// 用户角色
export const approveUserroleList = (params) => (fetch(api.APPROVE_USERROLE_LIST, params, 'post'))

// 用户角色--获取部门
export const approveUserroleDepart = (params) => (fetch(api.APPROVE_USERROLE_DEPART, params, 'post'))
// 用户角色--获取角色列表
export const approveUserroleRolelist = (params) => (fetch(api.APPROVE_USERROLE_ROLELIST, params, 'post'))
// 用户角色--获取角色
export const approveUserroleRole = (params) => (fetch(api.APPROVE_USERROLE_ROLE, params, 'post'))
// 创建白名单
export const createWhiteUser = (params) => fetch(api.CREATE_WHITE_USER, params, 'post')
// 查询白名单
export const searchWhiteUserList = (params) => fetch(api.SEARCH_WHITE_USER_LIST, params, 'post')
// 删除白名单
export const deleteWhiteUser = (params) => fetch(api.DELETE_WHITE_USER, params, 'post')
// 发起计划审批流程（预上线审批）
export const launchPlanApprove = (params) => fetch(api.LAUNCH_PLAN_APPROVE, params, 'post')
// 发起活动审批流程（上线审批）
export const launchActivityApprove = (params) => fetch(api.LAUNCH_ACTIVITY_APPROVE, params, 'post')
// 修改活动状态为预上线
export const changeStatusToPreOnline = (params) => fetch(api.CHANGE_TO_PREONLINE, params, 'post')
// 修改活动状态为测试通过
export const changeStatusToTestPass = (params) => fetch(api.CHANGE_TO_TEST_PASS, params, 'post')
// 修改活动状态为测试不通过
export const changeStatusToTestFail = (params) => fetch(api.CHANGE_TO_TEST_FAIL, params, 'post')
// 修改活动状态为暂停
export const changeStatusToPause = (params) => fetch(api.CHANGE_TO_PAUSE, params, 'post')
// 修改活动状态为下线
export const changeStatusToOffLine = (params) => fetch(api.CHANGE_TO_OFFLINE, params, 'post')


// 审批管理--审批代办
export const approvalCommission = (params) => (fetch(api.APPROVE_USERROLE_ROLE, params, 'post'))

// 用户角色 -- 查询所有角色
export const approvalUserSeachlist = (params) => (fetch(api.APPROVE_USER_SEACHLIST, params, 'post'))
// 用户角色--分配
export const approveUserroleAssign = (params) => (fetch(api.APPROVE_USERROLE_ASSIGN, params, 'post'))
// 用户角色 --根据id查询角色和部门
export const approveUserSeachUid = (params) => (fetch(api.APPROVE_USER_SEACHUID, params, 'post'))
// 修改计划下所有奖品及活动的审核状态
export const changeAllStatusByPlan = (params) => (fetch(api.CHANGE_ALL_STATUS_BY_PLAN, params, 'post'))
// 运营功能--奖品查询
export const operationPrizeList = (params) => fetch(api.OPERATION_PRIZE_FIND, params, 'post')
// 运营功能--奖品详情
export const operationPrizeDetailList = (params) => fetch(api.OPERATION_PRIZE_DETAIL_FIND, params, 'post')
// 运营功能--券码查询
export const operationCodeList = (params) => fetch(api.OPERATION_CODE_FIND, params, 'post')

// 无预算奖品
export const noBudgetAward = (params) => (fetch(api.NO_BUDGET_AWARD, params, 'post'))

// 无预算实物
export const noBudgetCreatephy = (params) => (fetch(api.NO_BUDGET_CREATEPHY, params, 'post'))

// 无预算第三方
export const noBudgetCreateThird = (params) => (fetch(api.NO_BUDGET_CREATETHIRD, params, 'post'))

// 无预算奖品查询
export const noBudgetSearch = (params) => (fetch(api.NO_BUDGET_SEARCH, params, 'post'))

// 无预算奖品启用
export const noBudgetEnable = (params) => (fetch(api.NO_BUDGET_ENABLE, params, 'post'))

// 无预算奖品停用
export const noBudgetDisable = (params) => (fetch(api.NO_BUDGET_DISABLE, params, 'post'))

// 无预算奖品查看库存
export const noBudgetGetstock = (params) => (fetch(api.NO_BUDGET_GETSTOCK, params, 'post'))

// 无预算奖品删除
export const noBudgetBuddelete = (params) => (fetch(api.NO_BUDGET_BUDDELETE, params, 'post'))
// 业务标识列表
export const allPlanBizIdfList = (params) => (fetch(api.PLANBIZIDF_LIST, params, 'post'))
// 新增业务标识
export const createPlanBizIdf = (params) => (fetch(api.PLANBIZIDF_CREATE, params, 'post'))
// 修改业务标识
export const modifyPlanBizIdf = (params) => (fetch(api.PLANBIZIDF_MODIFY, params, 'post'))
// 删除业务标识
export const deletePlanBizIdf = (params) => (fetch(api.PLANBIZIDF_DELETE, params, 'post'))
// 计划目标列表
export const allPlanTargetList = (params) => (fetch(api.PLANTARGET_LIST, params, 'post'))
// 新增计划目标
export const createPlanTarget = (params) => (fetch(api.PLANTARGET_CREATE, params, 'post'))
// 修改计划目标
export const modifyPlanTarget = (params) => (fetch(api.PLANTARGET_MODIFY, params, 'post'))
// 删除计划目标
export const deletePlanTarget = (params) => (fetch(api.PLANTARGET_DELETE, params, 'post'))
// 计划部门
export const allPlanDepartmentList = (params) => (fetch(api.PLANDEPARTMENT_LIST, params, 'post'))
export const enablePlanDepartment = (params) => (fetch(api.PLANDEPARTMENT_ENABLE, params, 'post'))
export const disablePlanDepartment = (params) => (fetch(api.PLANDEPARTMENT_DISABLE, params, 'post'))
export const detailPlanDepartment = (params) => (fetch(api.PLANDEPARTMENT_DETAIL, params, 'post'))
export const createPlanDepartment = (params) => (fetch(api.PLANDEPARTMENT_CREATE, params, 'post'))
export const modifyPlanDepartment = (params) => (fetch(api.PLANDEPARTMENT_MODIFY, params, 'post'))
export const deleteRelatePlanDepartment = (params) => (fetch(api.PLANDEPARTMENT_DISBAND, params, 'post'))

// 无预算导入优惠券
export const noBudgetUploadFile = (params) => (fetch(api.NO_BUDGET_UPLOADFILE, params, 'post'))

// 无预算-券码查询
export const noBudgetInstanceList = (params) => (fetch(api.NO_BUDGET_INSTANCELIST, params, 'post'))

// 无预算奖品-代码券搜索
export const noBudgetSearchInstance = (params) => (fetch(api.NO_BUDGET_SEARCHINSTANCE, params, 'post'))

// 手动绑券
export const newBindList = (params) => (fetch(api.NEW_BIND_LIST, params, 'post'))

// 手动绑券查看
export const newBindDetailsList = (params) => (fetch(api.NEW_BIND_DETAILSLIST, params, 'post'))

// 无预算奖品 回显
export const newBudgetSearchDetail = (params) => (fetch(api.NO_BUDGET_SEARCHDETAIL, params, 'post'))

// 无预算奖品小金库查询
export const noBudgetModifyInter = (params) => (fetch(api.NO_BUDGET_MODIFYINTER, params, 'post'))

// 无预算奖品第三方查询
export const noBudgetModifyThird = (params) => (fetch(api.NO_BUDGET_MODIFYTHIRD, params, 'post'))

// 无预算奖品实物查询
export const noBudgetModifyPhysical = (params) => (fetch(api.NO_BUDGET_MODIFYPHYSICAL, params, 'post'))


// 导入外部券码的查询接口
export const noBudgetThirdList = (params) => (fetch(api.NO_BUDGET_THIRDLIST, params, 'post'))

// 兑换码-查询可生成兑换码的活动
export const queryCdkeyActivity = (params) => (fetch(api.QUERY_CDKEY_ACTIVITY, params, 'post'))
// 兑换码-生成兑换码
export const createCdkey = (params) => (fetch(api.CREATE_CDKEY, params, 'post'))

// 兑换码 查询兑换码生成记录
export const getCdkeyRecordDataList = (params) => (fetch(api.QUERY_CDKEY_RECORD, params, 'post'))
// 兑换码 下载兑换码
export const downloadCdkeyList = (params) => (fetch(api.DOWNLOAD_CDKEY, params, 'post'))

// 后返活动-创建
export const createReturnActivity = (params) => (fetch(api.CREATE_RETURN_ACTIVITY, params, 'post'))

// 后返活动-更新
export const updateReturnActivity = (params) => (fetch(api.UPDATE_RETURN_ACTIVITY, params, 'post'))


// 后返活动-查询
export const queryReturnActivity = (params) => (fetch(api.QUERY_RETURN_ACTIVITY, params, 'post'))

// 运营功能--券码查询
export const operationActivityCodeList = (params) => fetch(api.OPERATION_ACTIVITY_CODE_FIND, params, 'post')
// 查询所有计划部门
export const searchAllDept = (params) => fetch(api.SEARCH_ALL_DEPT, params, 'post')
// 根据部门查询计划目标
export const searchTargetByDeptId = (params) => fetch(api.SEARCH_TARGET_BY_DEPT_ID, params, 'post')
// 根据计划查询计划目标
export const searchTargetByPlanId = (params) => fetch(api.SEARCH_TARGET_BY_PALN_ID, params, 'post')
// 根据计划查询业务标识
export const searchBizTypeByPlanId = (params) => fetch(api.SEARCH_BIZ_TYPE_BY_PLAN_ID, params, 'post')


// 手动绑券-上传文件
export const newBindByFile = (params) => fetch(api.NEW_BIND_BINDBYFILE, params, 'post')


// 手动绑券 - 文件内容手动输入
export const newBindByText = (params) => fetch(api.NEW_BIND_BINDBYTEXT, params, 'post')
// 查询奖品是否可编辑
export const prizeIsAllowEdit = (params) => fetch(api.PRIZE_IS_ALLOW_EDIT, params, 'post')

// 查询活动是否可编辑
export const activityIsAllowEdit = (params) => fetch(api.ACTIVITY_IS_ALLOW_EDIT, params, 'post')

// 查询奖品券的可用库存
export const couponsIsGetstock = (params) => fetch(api.COUPONS_IS_GETSTOCK, params, 'post')

// 生成奖品兑换码
export const couponsIsGeneratePrize = (params) => fetch(api.COUPONS_IS_GENERATEPRIZE, params, 'post')

// 查询兑换码的生成记录
export const couponsIsQueryCdKey = (params) => fetch(api.COUPONS_IS_QUERYCDKEY, params, 'post')

// 下载兑换码
export const couponsIsDownLoad = (params) => fetch(api.COUPONS_IS_DOWNLOAD, params, 'post')


// 奖品操作查询--查询券的可用库存
export const operateIsSearch = (params) => fetch(api.OPERATE_IS_SEARCH, params, 'post')

// 奖品操作查询--费用结算主体查询
export const operateIsGetSettleconfig = (params) => fetch(api.OPERATE_IS_GETSETTLECONFIG, params, 'post')

// 奖品操作查询--操作类型查询
export const operateIsGettoperatetype = (params) => fetch(api.OPERATE_IS_GETOPERATETYPE, params, 'post')

// 奖品操作查询--奖品类型查询
export const operateIsGetPrizecateCory = (params) => fetch(api.OPERATE_IS_GETPRIZECATEGORY, params, 'post')

// 实物中奖查询--实物奖品中奖查询
export const physicalIsSearch = (params) => fetch(api.PHYSICAL_IS_SEARCH, params, 'post')

// 实物中奖查询--获取实物奖品状态
export const physicalIsGetPhysical = (params) => fetch(api.PHYSICAL_IS_GETPHYSICALSTATUS, params, 'post')

// 实物中奖查询--发奖
export const physicalIsAwardsIngle = (params) => fetch(api.PHYSICAL_IS_AWARDSINGLEPRIZE, params, 'post')

// 实物中奖查询--导出数据
export const physicalIsExport = (params) => fetch(api.PHYSICAL_IS_EXPORT, params, 'post')