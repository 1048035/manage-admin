import request from '@/utils/request'

// 查询商品订单列表
export function list(query) {
  return request({
    url: '/FhStatistics/listStatistics',
    method: 'get',
    params: query
  })
}

// 查询商品订单详细
export function get(id) {
  return request({
    url: '/FhWithDraw/' + id,
    method: 'get'
  })
}

// 新增商品订单
export function addOrderShop(data) {
  return request({
    url: '/FhWithDraw/orderShop',
    method: 'post',
    data: data
  })
}

// 修改商品订单
export function update(data) {
  return request({
    url: '/FhWithDraw/update',
    method: 'put',
    data: data
  })
}

// 删除商品订单
export function del(id) {
  return request({
    url: '/FhWithDraw/' + id,
    method: 'delete'
  })
}
