import request from '@/utils/request'

// 查询app更新列表
export function listConfigApp(query) {
  return request({
    url: '/fhconfig/configApp/list',
    method: 'get',
    params: query
  })
}

// 查询app更新详细
export function getConfigApp(id) {
  return request({
    url: '/fhconfig/configApp/' + id,
    method: 'get'
  })
}

// 新增app更新
export function addConfigApp(data) {
  return request({
    url: '/fhconfig/configApp',
    method: 'post',
    data: data
  })
}

// 修改app更新
export function updateConfigApp(data) {
  return request({
    url: '/fhconfig/configApp',
    method: 'put',
    data: data
  })
}

// 删除app更新
export function delConfigApp(id) {
  return request({
    url: '/fhconfig/configApp/' + id,
    method: 'delete'
  })
}
