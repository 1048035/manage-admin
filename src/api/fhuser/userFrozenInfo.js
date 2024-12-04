import request from '@/utils/request'

// 查询冻结明细列表
export function listUserFrozenInfo(query) {
  return request({
    url: '/fhuser/userFrozenInfo/list',
    method: 'get',
    params: query
  })
}

// 查询冻结明细详细
export function getUserFrozenInfo(id) {
  return request({
    url: '/fhuser/userFrozenInfo/' + id,
    method: 'get'
  })
}

// 新增冻结明细
export function addUserFrozenInfo(data) {
  return request({
    url: '/fhuser/userFrozenInfo',
    method: 'post',
    data: data
  })
}

// 修改冻结明细
export function updateUserFrozenInfo(data) {
  return request({
    url: '/fhuser/userFrozenInfo',
    method: 'put',
    data: data
  })
}

// 删除冻结明细
export function delUserFrozenInfo(id) {
  return request({
    url: '/fhuser/userFrozenInfo/' + id,
    method: 'delete'
  })
}
