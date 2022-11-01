import request from '@/utils/request'

/**
 * 员工列表
 * @param {*} page
 * @param {*} size
 * @returns
 */
export const reqGetUserList = (page = 1, size = 5) => request({
  url: '/sys/user',
  method: 'GET',
  params: {
    page,
    size
  }
})
