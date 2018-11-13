import Vue from 'vue'
import { formatDate } from 'utils/util'
import { PLAN_STATUS, PLAN_TARGETS, PLAN_DEPARTMENTS, PRIZE_CATEGORY, AWARDS_TYPE, RULES_NAMES, ACTIVITY_STATUS } from 'common/config'

/**
 * 时间过滤器
 * @param value {String} | 前面的值
 * @param type  {String} formatDate('参数')
 * @returns 转换后的时间格式 2018-08-08 12:00:00
 */
Vue.filter('formatDate', function(value, type) {
  if (!value) return ''
  return formatDate(type, value)
})

// 数组分隔
Vue.filter('splitArr', function(value, type) {
  if (!value) return ''
  return value.join(type)
})

// 营销计划状态
Vue.filter('planStatus', function(value) {
  if (!value) return ''
  return PLAN_STATUS[value]
})

// 营销计划目标
Vue.filter('planTarget', function(value) {
  if (!value) return ''
  return PLAN_TARGETS[value]
})

// 营销计划部门
Vue.filter('planDepartment', function(value) {
  if (!value) return ''
  return PLAN_DEPARTMENTS[value]
})

// 奖品类别
Vue.filter('prizeType', function(value) {
  if (!value) return ''
  return PRIZE_CATEGORY[value]
})

// 奖项类型
Vue.filter('awardsType', function(value) {
  if (!value) return ''
  return AWARDS_TYPE[value]
})

// 规则名称
Vue.filter('ruleNames', function(value) {
  if (!value) return ''
  return RULES_NAMES[value] || '外部规则'
})

// 活动状态
Vue.filter('activityStatus', function(value) {
  if (!value) return ''
  return ACTIVITY_STATUS[value]
})
