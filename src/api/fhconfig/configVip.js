import request from '@/utils/request'

// 查询vip配置列表
export function listConfigVip(query) {
  return request({
    url: '/fhconfig/configVip/list',
    method: 'get',
    params: query
  })
}

// 查询vip配置详细
export function getConfigVip(id) {
  return request({
    url: '/fhconfig/configVip/' + id,
    method: 'get'
  })
}

// 新增vip配置
export function addConfigVip(data) {
  return request({
    url: '/fhconfig/configVip',
    method: 'post',
    data: data
  })
}

// 修改vip配置
export function updateConfigVip(data) {
  return request({
    url: '/fhconfig/configVip',
    method: 'put',
    data: data
  })
}

// 删除vip配置
export function delConfigVip(id) {
  return request({
    url: '/fhconfig/configVip/' + id,
    method: 'delete'
  })
}
