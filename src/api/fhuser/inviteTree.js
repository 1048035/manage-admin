import request from '@/utils/request'

// 查询邀请树列表
export function listInviteTree(query) {
  return request({
    url: '/fhuser/inviteTree/list',
    method: 'get',
    params: query
  })
}

// 查询邀请树详细
export function getInviteTree(id) {
  return request({
    url: '/fhuser/inviteTree/' + id,
    method: 'get'
  })
}

// 新增邀请树
export function addInviteTree(data) {
  return request({
    url: '/fhuser/inviteTree',
    method: 'post',
    data: data
  })
}

// 修改邀请树
export function updateInviteTree(data) {
  return request({
    url: '/fhuser/inviteTree',
    method: 'put',
    data: data
  })
}

// 删除邀请树
export function delInviteTree(id) {
  return request({
    url: '/fhuser/inviteTree/' + id,
    method: 'delete'
  })
}
