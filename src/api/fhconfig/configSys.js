import request from '@/utils/request'

// 查询参数配置列表
export function listConfigSys(query) {
  return request({
    url: '/fhconfig/configSys/list',
    method: 'get',
    params: query
  })
}

// 查询参数配置详细
export function getConfigSys(id) {
  return request({
    url: '/fhconfig/configSys/' + id,
    method: 'get'
  })
}

// 新增参数配置
export function addConfigSys(data) {
  return request({
    url: '/fhconfig/configSys',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfigSys(data) {
  return request({
    url: '/fhconfig/configSys',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfigSys(id) {
  return request({
    url: '/fhconfig/configSys/' + id,
    method: 'delete'
  })
}
