import request from '@/utils/request'

// 查询推广规则列表
export function listConfigRule(query) {
  return request({
    url: '/fhconfig/configRule/list',
    method: 'get',
    params: query
  })
}

// 查询推广规则详细
export function getConfigRule(id) {
  return request({
    url: '/fhconfig/configRule/' + id,
    method: 'get'
  })
}

// 新增推广规则
export function addConfigRule(data) {
  return request({
    url: '/fhconfig/configRule',
    method: 'post',
    data: data
  })
}

// 修改推广规则
export function updateConfigRule(data) {
  return request({
    url: '/fhconfig/configRule',
    method: 'put',
    data: data
  })
}

// 删除推广规则
export function delConfigRule(id) {
  return request({
    url: '/fhconfig/configRule/' + id,
    method: 'delete'
  })
}
