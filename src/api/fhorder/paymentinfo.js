import request from '@/utils/request'

// 查询商品信息列表
export function listShopItem(query) {
  return request({
    url: '/session/task/list',
    method: 'get',
    params: query
  })
}

// 查询商品信息列表
export function listWsTask(query) {
  return request({
    url: '/session/task/ws/list',
    method: 'get',
    params: query
  })
}
// 删除商品信息
export function delWs(id) {
  return request({
    url: '/session/task/ws/' + id,
    method: 'delete'
  })
}

// 删除商品信息
export function delShopItem(id) {
  return request({
    url: '/session/task/' + id,
    method: 'delete'
  })
}
