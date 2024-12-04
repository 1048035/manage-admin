import request from '@/utils/request'

// 查询商品信息列表
export function listShopItem(query) {
  return request({
    url: '/fhshop/shopItem/list',
    method: 'get',
    params: query
  })
}

// 查询商品信息详细
export function getShopItem(id) {
  return request({
    url: '/fhshop/shopItem/' + id,
    method: 'get'
  })
}

// 新增商品信息
export function addShopItem(data) {
  return request({
    url: '/fhshop/shopItem',
    method: 'post',
    data: data
  })
}

// 修改商品信息
export function updateShopItem(data) {
  return request({
    url: '/fhshop/shopItem',
    method: 'put',
    data: data
  })
}

// 删除商品信息
export function delShopItem(id) {
  return request({
    url: '/fhshop/shopItem/' + id,
    method: 'delete'
  })
}
