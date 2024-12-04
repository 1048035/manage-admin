import request from '@/utils/request'

// 查询用户积分列表
export function listUserAccount(query) {
  return request({
    url: '/fhuser/userAccount/list',
    method: 'get',
    params: query
  })
}

// 查询用户积分详细
export function getUserAccount(userId) {
  return request({
    url: '/fhuser/userAccount/' + userId,
    method: 'get'
  })
}

// 查询用户通证明细
export function getUserReleaseList(userId) {
  return request({
    url: '/fhuser/userAccount/getUserReleaseList/' + userId,
    method: 'get'
  })
}

// 新增用户积分
export function addUserAccount(data) {
  return request({
    url: '/fhuser/userAccount',
    method: 'post',
    data: data
  })
}

// 修改用户积分
export function updateUserAccount(data) {
  return request({
    url: '/fhuser/userAccount',
    method: 'put',
    data: data
  })
}

// 删除用户积分
export function delUserAccount(userId) {
  return request({
    url: '/fhuser/userAccount/' + userId,
    method: 'delete'
  })
}
// 新增用户余额
export function addAccount(data) {
    return request({
      url: '/fhuser/userAccount/addScore',
      method: 'post',
      data: data
    })
  }
// 新增用户余额
export function reduceAccount(data) {
    return request({
      url: '/fhuser/userAccount/reduceScore',
      method: 'post',
      data: data
    })
}

// 释放余额
export function realseScore(data) {
    return request({
      url: '/fhuser/userAccount/realseScore',
      method: 'post',
      data: data
    })
}
export function unitAccount(data) {
    return request({
      url: '/fhuser/userAccount/editUnit',
      method: 'post',
      data: data
    })
  }

  export function editMultiUnit(data) {
      return request({
        url: '/fhuser/userAccount/editMultiUnit',
        method: 'post',
        data: data
      })
    }
    // 查询参数配置详细
export function getConfigSys() {
  return request({
    url: '/fhconfig/configSys/init' ,
    method: 'get'
  })
}
