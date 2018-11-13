/**
 * 封装promise请求对象
 */
import axios from 'axios'
import { BASE_URL } from '../api'
import { LOGIN_URL } from './config'
// import qs from 'qs'

export default function fetch (url = '', data = {}, method = 'get') {
  method = method.toLowerCase()
  // get 请求不需要拼接参数
  let ops = { params: data }
  if (method === 'post') {
    let rData = Object.assign({}, data)
    // ops = { data: qs.stringify(rData) }
    ops = { data: rData }
  }

  // console.log(url)
  
  // 公共参数存储(待添加...)
  let options = {
    url,
    ...ops,
    method
  }

  return new Promise((resolve, reject) => {
    // 创建一个axios实例
    const instance = axios.create({
      // 设置默认根地址
      baseURL: BASE_URL,
      // 设置请求超时设置
      timeout: 30000,
      // 允许携带cookie
      withCredentials: true,
      crossDomain: true,
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
    // 请求处理
    instance(options)
      .then(({ data }) => {
        // 未登录
        if (data.code === '0') {
          // let returnurl = encodeURIComponent(window.location.href)
          window.location.href = LOGIN_URL
          return false
        }
        /* if (data.respCode !== '00000') {
          // 请求失败状态
          return reject(data)
        } */
        return resolve(data)
      })
      .catch(error => {
        // 请求失败时,根据业务判断状态
        if (error.response) {
          // let resError = error.response
          let resCode = error.status
          let resMsg = error.message
          let err = {'code': resCode, 'respMsg': resMsg}
          // console.log('请求数据失败！')
          return reject(err)
        } else {
          // console.log('数据请求超时')
          let err = { 'type': 'canceled', 'respMsg': '数据请求超时' }
          return reject(err)
        }
      })
  })
}
