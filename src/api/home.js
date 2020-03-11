/**
 * 封装主页接口模块
 */
import axios from '../utils/request.js'

/**
 * 获取登录用户信息接口
 */
export function getUserInfo() {
  return axios.get('user/profile')
}
