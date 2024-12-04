import request from '@/utils/request'

// 查询商品订单列表
export function listOrderShop(query) {
  return request({
    url: '/fhorder/orderShop/list',
    method: 'get',
    params: query
  })
}

// 查询商品订单详细
export function getOrderShop(id) {
  return request({
    url: '/fhorder/orderShop/' + id,
    method: 'get'
  })
}

// 新增商品订单
export function addOrderShop(data) {
  return request({
    url: '/fhorder/orderShop',
    method: 'post',
    data: data
  })
}

// 修改商品订单
export function updateOrderShop(data) {
  return request({
    url: '/fhorder/orderShop/check',
    method: 'put',
    data: data
  })
}

// 删除商品订单
export function delOrderShop(id) {
  return request({
    url: '/fhorder/orderShop/' + id,
    method: 'delete'
  })
}
