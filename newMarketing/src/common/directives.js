import Vue from 'vue'
import store from 'store'
/**
 * Mock
 * 匹配到权限的开头，再获取对应权限的长度，依次比较相同权限的值
 */
// let permissions = {
//   cleaning: ['cleaning:*:*'],
//   plan: ['plan:query:*', 'plan:create:*'],
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
 * 按钮级别的权限控制（目前该版本似乎没有什么问题）
 * 验证路由页面中是否包含对应的权限，没有则移除，否则显示
 * plan:* 如果涉及/到1级权限中带*的，将plan一级权限开头的按钮全部显示
 */
// Vue.directive('hasPermissionsBack', {
//   update: function(el, binding, vnode) {
//     // console.log(arguments)
// if (getParams('activityStatus') === 'AUDITING' || getParams('activityStatus') === 'ONLINE_AUDITING' || getParams('activityStatus') === 'ONLINE' ||
//       getParams('activityStatus') === 'PAUSE' || getParams('activityStatus') === 'OFFLINE') {
//       // el.parentNode && el.parentNode.removeChild(el)
//       el.style.display = 'none'
//       console.log('come in')
//       return
//     } else {
//       el.style.display = 'block'
//     }
//     // console.log(store.state.permissions)
    
//     // 级别最多为3级
//     let level = 3
//     let permissions = store.state.permissions
//     let value = binding.value

//     // 前缀
//     let prefixStr = value.split(':')[0]

//     if (permissions[prefixStr]) {
//       let arr = permissions[prefixStr]
//       for (var i = 0; i < arr.length; i++) {
//         var item = arr[i]
//         // 第一次优先匹配两个*号的权限（所有权限）
//         // if (item.split(':').length === level && item.match(/\*/g) && item.match(/\*/g).length === 2) {
        
//         // 3级,所有权限
//         if (item.split(':').length === level && arr.includes(prefixStr + ':*:*')) {
//           // 找不到匹配，删除
//           if (value.indexOf(item.split(':')[0]) === -1) {
//             // console.log('35:remove')
//             el.parentNode.removeChild(el)
//             break
//           } else {
//             // console.log('找着了' + value)
//             break
//           }
//         // } else if (item.split(':').length >= level) {
//         } else if (item.split(':').length === value.split(':').length) {
//           // 2级
//           if (arr.includes(value)) {
//             // console.log('找着了' + value)
//             break
//           }
//           // 首先寻找当前传入的权限
//           if (!arr.includes(value)) {
//             // 找不到传入的权限，意味着权限中间可能会出现*:*的字符，继续寻找是否包含*:*两个星的存在，若都不存在，表示该权限确实已经没有，进行删除元素
//             if (!arr.includes(prefixStr + ':*:*')) {
//               el.parentNode && el.parentNode.removeChild(el)
//               break
//             } else {
//               // console.log('找着了' + value)
//               break
//             }
//           }
//           // 与router.js beforeEach中的判断有点区别，先遗留
//         } else {
//           // console.log('没找着' + value)
//           el.parentNode && el.parentNode.removeChild(el)
//         }
//       }
//     } else {
//       // console.log('没找着' + value)
//       el.parentNode && el.parentNode.removeChild(el)
//     }
//   }
// })


// mock
// let permissionsList = [
//   'marketingPlanManage:allPlan:createPlan',
//   'marketingPlanManage:allPlan:query'
// ]

Vue.directive('hasPermissions', {
  bind: function(el, binding, vnode) {
    let permissions = store.state.permissions
    let value = binding.value
    if (!permissions.includes(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    } else {
      // console.log('找着了' + value)
    }
  }
})
