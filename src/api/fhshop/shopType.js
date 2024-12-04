import request from '@/utils/request'

// 查询商品类别列表
export function listShopType(query) {
  return request({
    url: '/fhshop/shopType/list',
    method: 'get',
    params: query
  })
}

// 查询商品类别详细
export function getShopType(id) {
  return request({
    url: '/fhshop/shopType/' + id,
    method: 'get'
  })
}

// 新增商品类别
export function addShopType(data) {
  return request({
    url: '/fhshop/shopType',
    method: 'post',
    data: data
  })
}

// 修改商品类别
export function updateShopType(data) {
  return request({
    url: '/fhshop/shopType',
    method: 'put',
    data: data
  })
}

// 删除商品类别
export function delShopType(id) {
  return request({
    url: '/fhshop/shopType/' + id,
    method: 'delete'
  })
}
