/**
 * 内容列表请求模块
 */
import axios from '../utils/request.js'

/**
 *获取全部文章列表接口
 *
 * @export
 * @param {*} query
 * @returns
 */
export function getArticlesList(query) {
  return axios.get('articles', { params: query })
}

export function delArticles(id) {
  return axios.delete(`articles/${id}`)
}
