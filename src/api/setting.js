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

/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export const reqDelRole = (id) => request({
  url: `/sys/role/${id}`,
  method: 'delete'
})
