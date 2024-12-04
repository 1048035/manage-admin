import request from '@/utils/request'

// 查询客服配置列表
export function listConfigService(query) {
  return request({
    url: '/fhconfig/configService/list',
    method: 'get',
    params: query
  })
}

// 查询客服配置详细
export function getConfigService(id) {
  return request({
    url: '/fhconfig/configService/' + id,
    method: 'get'
  })
}

// 新增客服配置
export function addConfigService(data) {
  return request({
    url: '/fhconfig/configService',
    method: 'post',
    data: data
  })
}

// 修改客服配置
export function updateConfigService(data) {
  return request({
    url: '/fhconfig/configService',
    method: 'put',
    data: data
  })
}

// 删除客服配置
export function delConfigService(id) {
  return request({
    url: '/fhconfig/configService/' + id,
    method: 'delete'
  })
}
