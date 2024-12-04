import request from '@/utils/request'

// 查询轮播图列表
export function listBanner(query) {
  return request({
    url: '/fhconfig/gongxianzhi/list',
    method: 'get',
    params: query
  })
}

// 查询轮播图详细
export function getBanner(id) {
  return request({
    url: '/fhconfig/gongxianzhi/' + id,
    method: 'get'
  })
}

// 新增轮播图
export function addBanner(data) {
  return request({
    url: '/fhconfig/gongxianzhi',
    method: 'post',
    data: data
  })
}

// 修改轮播图
export function updateBanner(data) {
  return request({
    url: '/fhconfig/gongxianzhi',
    method: 'put',
    data: data
  })
}

// 删除轮播图
export function delBanner(id) {
  return request({
    url: '/fhconfig/gongxianzhi/' + id,
    method: 'delete'
  })
}
