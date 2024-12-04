import request from '@/utils/request'

// 查询用户信息列表
export function listUser(query) {
  return request({
    url: '/fhuser/user/list',
    method: 'get',
    params: query
  })
}
// 查询用户信息2列表
export function listUserOld(query) {
  return request({
    url: '/fhuser/user/listOld',
    method: 'get',
    params: query
  })
}


// 查询转让积分列表
export function listSellScore(query) {
  return request({
    url: '/sellScore/list',
    method: 'get',
    params: query
  })
}

// 查询用户信息详细
export function getUser(id) {
  return request({
    url: '/fhuser/user/' + id,
    method: 'get'
  })
}

// 删除参数配置
export function delUser(id) {
  return request({
    url: '/fhuser/user/' + id,
    method: 'delete'
  })
}

// 新增用户信息
export function addUser(data) {
  return request({
    url: '/fhuser/user',
    method: 'post',
    data: data
  })
}

// 修改用户信息
export function updateUser(data) {
  return request({
    url: '/fhuser/user',
    method: 'put',
    data: data
  })
}
// 修改用户门店编号信息
export function updateStoreNUmber(data) {
  return request({
    url: '/fhuser/user/updateStoreNUmber',
    method: 'put',
    data: data
  })
}

// 增加积分信息
export function addScore(data) {
  return request({
    url: '/fhuser/user/addScore',
    method: 'post',
    data: data
  })
}

// 减少用户信息
export function reduceScore(data) {
  return request({
    url: '/fhuser/user/reduceScore',
    method: 'post',
    data: data
  })
}
