// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'assets/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import store from './store'
import router from './router'
import 'common/directives'
import 'common/filters'
import 'echarts'
import 'jquery'
import ECharts from 'vue-echarts/components/ECharts'
// 自定全局插件
import Loading from 'components/loading'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.component('chart', ECharts)

Vue.use(Loading)

/**
 * http错误拦截处理（success）
 * @param {Object} _this vue实例，获取注入到vue中element的方法
 * @param {Object} res   http返回数据
 */
Vue.prototype.httpThen = (_this, res) => {
  let flag = false
  if (res.code !== '1') {
    flag = false
    console.log(res)
    _this.$message.error(res.message)
  } else {
    flag = true
  }
  return flag
}

/**
 * http错误拦截处理（error）
 * @param {Object} _this vue实例，获取注入到vue中element的方法
 * @param {Object} err   http catch时的捕获信息
 */
Vue.prototype.httpCatch = (_this, err) => {
  // 打印异常，方便开发调试
  console.log(err)
  _this.$message.error('服务器请求失败')
}

// 返回上一页
Vue.prototype.prevPage = () => {
  router.go(-1)
}

// 重置表单
Vue.prototype.resetForm = (_this, formName) => {
  clearTimeout(() => {
    _this.$refs[formName].clearValidate()
    _this.$refs[formName].resetFields()
  }, 10)
}

// 去除首尾巴多余分隔符 |
Vue.prototype.replaceSeparator = (str) => {
  return str.replace(/^\||\|$/g, '') || ''
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
