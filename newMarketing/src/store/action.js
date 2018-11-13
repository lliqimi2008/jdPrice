/**
 * 需要异步请求，通过commit操作mutation
 */

import * as types from './mutation-types.js'

// 登录状态
export const setIsLogin = function ({ commit, state }, res) {
  commit(types.SET_ISLOGIN, res)
}
// 用户信息
export const setUserInfo = function ({ commit, state }, res) {
  commit(types.SET_USERINFO, res)
}
// 菜单
export const setMenuList = function ({ commit, state }, res) {
  commit(types.SET_MENU_LIST, res)
}
// 权限
export const setPermissions = function ({ commit, state }, res) {
  commit(types.SET_PERMISSIONS, res)
}
// 规则组数据
export const setRulesGroups = function ({ commit, state }, res) {
  commit(types.SET_RULES_GROUPS, res)
}
// 奖项id 
export const setAwardsId = function ({ commit, state }, res) {
  commit(types.SET_AWARDS_ID, res)
}

// 单个奖品 
export const setSinglePrize = function ({ commit, state }, res) {
  commit(types.SET_SINGLE_PRIZE, res)
}

// 单个礼包 
export const setSingleBag = function ({ commit, state }, res) {
  commit(types.SET_SINGLE_BAG, res)
}

// 是否添加规则组 
export const setIsAddRuleGroup = function ({ commit, state }, res) {
  commit(types.SET_IS_ADD_RULE_GROUP, res)
}
