import request from '@/utils/request'

// 查询轮播图列表
export function listBanner(query) {
  return request({
    url: '/fhconfig/banner/list',
    method: 'get',
    params: query
  })
}

// 查询轮播图详细
export function getBanner(id) {
  return request({
    url: '/fhconfig/banner/' + id,
    method: 'get'
  })
}

// 新增轮播图
export function addBanner(data) {
  return request({
    url: '/fhconfig/banner',
    method: 'post',
    data: data
  })
}

// 修改轮播图
export function updateBanner(data) {
  return request({
    url: '/fhconfig/banner',
    method: 'put',
    data: data
  })
}

// 删除轮播图
export function delBanner(id) {
  return request({
    url: '/fhconfig/banner/' + id,
    method: 'delete'
  })
}
