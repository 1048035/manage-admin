import request from '@/utils/request'

// 查询邀请关系列表
export function listUserInvite(query) {
  return request({
    url: '/fhuser/userInvite/list',
    method: 'get',
    params: query
  })
}

// 查询邀请关系详细
export function getUserInvite(id) {
  return request({
    url: '/fhuser/userInvite/' + id,
    method: 'get'
  })
}

// 新增邀请关系
export function addUserInvite(data) {
  return request({
    url: '/fhuser/userInvite',
    method: 'post',
    data: data
  })
}

// 修改邀请关系
export function updateUserInvite(data) {
  return request({
    url: '/fhuser/userInvite',
    method: 'put',
    data: data
  })
}

// 删除邀请关系
export function delUserInvite(id) {
  return request({
    url: '/fhuser/userInvite/' + id,
    method: 'delete'
  })
}
