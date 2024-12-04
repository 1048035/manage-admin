import request from '@/utils/request'


export function sysIndexTotal() {
  return request({
    url: '/fhindex/index',
    method: 'get',
   
  })
}
export function sysRegisterTotal() {
  return request({
    url: '/fhindex/register',
    method: 'get',
   
  })
}

