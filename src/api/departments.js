import request from '@/utils/request'

export const reqGetDepartments = () => {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}
