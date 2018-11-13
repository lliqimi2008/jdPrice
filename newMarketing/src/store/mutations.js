/**
 * 直接操作state，唯一可修改state的地方
 */
import * as types from './mutation-types.js'

const mutations = {
  [types.SET_ISLOGIN] (state, payload) {
    state.isLogin = payload
  },
  [types.SET_USERINFO] (state, payload) {
    state.userInfo = payload
  },
  [types.SET_MENU_LIST] (state, payload) {
    state.menuList = payload
  },
  [types.SET_PERMISSIONS] (state, payload) {
    state.permissions = payload
  },
  [types.SET_RULES_GROUPS] (state, payload) {
    state.rulesGroups = payload
  },
  [types.SET_AWARDS_ID] (state, payload) {
    state.awardsId = payload
  },
  [types.SET_SINGLE_PRIZE] (state, payload) {
    state.singlePrize = payload
  },
  [types.SET_SINGLE_BAG] (state, payload) {
    state.singleBag = payload
  },
  [types.SET_IS_ADD_RULE_GROUP] (state, payload) {
    state.isAddRuleGroup = payload
  }
}

export default mutations
