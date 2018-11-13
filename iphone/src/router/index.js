import Vue from 'vue'
import Router from 'vue-router'
import LedVouchers from '@/components/ledVouchers'

Vue.use(Router)

let routes = [
  {
    name: '',
    path: '',
    redirect: '/ledVouchers'
  },
  {
    name: 'ledVoucher',
    path: '/ledVouchers',
    component: LedVouchers
    /* children: [
      {path: ':activityId'}
    ] */
  },
  {
    path: '/',
    name: 'ledVouchers',
    component: LedVouchers
  },
  {
    name: 'index',
    path: '/index',
    component: LedVouchers
  }
]

const router = new Router({
  routes,
  mode: 'hash'
})

export default router
