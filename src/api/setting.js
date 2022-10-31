import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {*} page
 * @param {*} pagesize
 * @returns
 */
export const reqGetRoleList = (page, pagesize = 10) => request({
  url: '/sys/role',
  method: 'GET',
  params: {
    page,
    pagesize
  }
})
