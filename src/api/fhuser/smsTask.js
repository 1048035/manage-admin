import request from '@/utils/request'

// 查询用户财务列表
export function listUserFinance(query) {
  return request({
    url: '/sms/record/list',
    method: 'get',
    params: query
  })
}

// 查询用户财务详细
export function getUserFinance(id) {
  return request({
    url: '/fhuser/userFinance/' + id,
    method: 'get'
  })
}

// 新增用户财务
export function addUserFinance(data) {
  return request({
    url: '/fhuser/userFinance',
    method: 'post',
    data: data
  })
}

// 修改用户财务
export function updateUserFinance(data) {
  return request({
    url: '/fhuser/userFinance',
    method: 'put',
    data: data
  })
}

// 删除用户财务
export function delUserFinance(id) {
  return request({
    url: '/fhuser/userFinance/' + id,
    method: 'delete'
  })
}
