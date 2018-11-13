import Mock from 'mockjs'

/**
 * 状态码说明:
 * 0: 未登录
 * 1: 请求成功
 * 2: 请求失败
 */


// 权限接口
Mock.mock(/findMenuList__/, {
  success: true,
  code: '1',
  msg: '成功',
  data: {
    menus: [
      {
        children: [
          {
            hasChildren: false,
            menuId: '100066',
            parent: {
              $ref: '$.menus[0]'
            },
            text: '全部营销计划',
            url: '/marketingPlanManage/allPlan'
          },
          {
            hasChildren: false,
            menuId: '100067',
            parent: {
              $ref: '$.menus[0]'
            },
            text: '全部奖品',
            url: '/marketingPlanManage/allPrize'
          },
          {
            hasChildren: false,
            menuId: '100068',
            parent: {
              $ref: '$.menus[0]'
            },
            text: '全部活动',
            url: '/marketingPlanManage/allActivity'
          }
        ],
        hasChildren: true,
        menuId: '100065',
        text: '营销计划管理',
        url: '/marketingPlanManage/allPlan'
      }
    ],
    permissions: {
      cleaning: ['cleaning:*:*'],
      plan: ['plan:*:*'],
      basic: ['basic:*:*'],
      merchant: ['merchant:*:*'],
      realm: [
        'realm:res:view',
        'realm:user:delete',
        'realm:role:create',
        'realm:role:update',
        'realm:res:update',
        'realm:res:create',
        'realm:role:view',
        'realm:res:*',
        'realm:*:*',
        'realm:role:*',
        'realm:role:delete',
        'realm:user:*',
        'realm:user:view',
        'realm:role:assign',
        'realm:res:delete',
        'realm:user:assign'
      ],
      prize: ['prize:*:*'],
      crm: ['crm:*:*'],
      activity: ['activity:*:*'],
      bpm: ['bpm:*:*']
    }
  }
})
