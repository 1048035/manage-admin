import request from '@/utils/request'

// 查询总积分配置列表
export function listAdminScore(query) {
  return request({
    url: '/fhconfig/adminScore/list',
    method: 'get',
    params: query
  })
}

// 查询总积分配置详细
export function getAdminScore(id) {
  return request({
    url: '/fhconfig/adminScore/' + id,
    method: 'get'
  })
}

// 新增总积分配置
export function addAdminScore(data) {
  return request({
    url: '/fhconfig/adminScore',
    method: 'post',
    data: data
  })
}

// 修改总积分配置
export function updateAdminScore(data) {
  return request({
    url: '/fhconfig/adminScore',
    method: 'put',
    data: data
  })
}

// 删除总积分配置
export function delAdminScore(id) {
  return request({
    url: '/fhconfig/adminScore/' + id,
    method: 'delete'
  })
}
