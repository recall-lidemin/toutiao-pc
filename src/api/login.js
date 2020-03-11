/**
 * 封装登录请求模块
 *
 */

import axios from '../utils/request.js'

/**
 * 登录接口
 * @param {*} loginForm
 */
export function login(loginForm) {
  return axios.post('authorizations', loginForm)
}
