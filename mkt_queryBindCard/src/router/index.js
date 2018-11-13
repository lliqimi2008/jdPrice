import Vue from 'vue'
import Router from 'vue-router'
import PaymentScene from '@/components/paymentScene'

Vue.use(Router)

let routes = [
  {
    name: 'paymentSceneone',
    path: '',
    redirect: '/paymentScene'
  },
  {
    name: 'paymentScenetwo',
    path: '/paymentScene',
    component: PaymentScene
    /* children: [
      {path: ':activityId'}
    ] */
  },
  {
    path: '/',
    name: 'paymentScene',
    component: PaymentScene
  },
  {
    name: 'index',
    path: '/index',
    component: PaymentScene
  }
]

const router = new Router({
  routes,
  mode: 'hash'
})

export default router
