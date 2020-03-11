/**
 * 封装发布文章接口模块
 */
import axios from '../utils/request.js'

/**
 * 获取频道列表接口
 */
export function getChannelsList() {
  return axios.get('channels')
}

/**
 * 发布文章接口
 * @param {*} id
 * @param {*} draft
 * @param {*} publishForm
 */
export function publish(id, draft, publishForm) {
  return axios({
    url: id ? `articles/${id}` : 'articles',
    method: id ? 'put' : 'post',
    params: {
      draft
    },
    data: publishForm
  })
}

/**
 * 根据id获取文章
 * @param {*} id
 */
export function getArticlesById(id) {
  return axios.get(`articles/${id}`)
}
