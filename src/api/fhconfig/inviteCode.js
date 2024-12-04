import request from '@/utils/request'

// 查询系统邀请码列表
export function listInviteCode(query) {
  return request({
    url: '/fhconfig/inviteCode/list',
    method: 'get',
    params: query
  })
}

// 查询系统邀请码详细
export function getInviteCode(id) {
  return request({
    url: '/fhconfig/inviteCode/' + id,
    method: 'get'
  })
}

// 新增系统邀请码
export function addInviteCode(data) {
  return request({
    url: '/fhconfig/inviteCode',
    method: 'post',
    data: data
  })
}

// 修改系统邀请码
export function updateInviteCode(data) {
  return request({
    url: '/fhconfig/inviteCode',
    method: 'put',
    data: data
  })
}

// 删除系统邀请码
export function delInviteCode(id) {
  return request({
    url: '/fhconfig/inviteCode/' + id,
    method: 'delete'
  })
}
