/**
 * 封装操作用户信息请求模块
 *
 */
import axios from '../utils/request.js'

/**
 * 获取用户信息接口
 */
export function getUserInfo() {
  return axios.get('user/profile')
}

/**
 * 修改用户头像接口
 * @param {*} fd
 */
export function uploadImg(fd) {
  return axios.patch('user/photo', fd)
}

/**
 * 保存用户信息接口
 * @param {*} userForm
 */
export function saveUserInfo(userForm) {
  return axios.patch('user/profile', userForm)
}
