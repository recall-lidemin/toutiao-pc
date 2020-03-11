/**
 * 评论请求模块
 */
import axios from '../utils/request.js'

/**
 * 获取全部评论接口
 * @param {*} params
 */
export function getCommentList(params) {
  return axios.get('articles', { params: params })
}

/**
 * 更新对应评论状态接口
 * @param {*} id
 * @param {*} status
 */
export function commentClosed(id, status) {
  return axios.put(`comments/status?article_id=${id}`, {
    allow_comment: !status
  })
}
