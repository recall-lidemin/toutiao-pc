/**
 * 封装素材请求模块
 *
 */

import axios from '../utils/request.js'

/**
 *获取全部图片素材接口
 * @param {*} params
 */
export function getImgList (params) {
  return axios.get('user/images', { params: params })
}

/**
 * 上传图片接口
 * @param {*} data
 */
export function uploadImg(data) {
  return axios.post('user/images', data)
}

/**
 * 收藏图片接口
 * @param {*} id
 * @param {*} params
 */
export function collectPic(id, collect) {
  return axios.put(`user/images/${id}`, { collect: !collect })
}

/**
 * 删除素材接口
 * @param {*} id
 */
export function delPic(id) {
  return axios.delete(`user/images/${id}`)
}
