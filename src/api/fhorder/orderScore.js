import request from '@/utils/request'

// 查询积分订单列表
export function listOrderScore(query) {
  return request({
    url: '/fhorder/orderScore/list',
    method: 'get',
    params: query
  })
}

// 查询积分订单详细
export function getOrderScore(id) {
  return request({
    url: '/fhorder/orderScore/' + id,
    method: 'get'
  })
}

// 新增积分订单
export function addOrderScore(data) {
  return request({
    url: '/fhorder/orderScore',
    method: 'post',
    data: data
  })
}

// 修改积分订单
export function updateOrderScore(data) {
  return request({
    url: '/fhorder/orderScore',
    method: 'put',
    data: data
  })
}

// 删除积分订单
export function delOrderScore(id) {
  return request({
    url: '/fhorder/orderScore/' + id,
    method: 'delete'
  })
}
