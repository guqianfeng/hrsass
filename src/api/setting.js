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

/**
 * 添加角色
 * @param {*} form
 * @returns
 */
export const reqAddRole = (form) => request({
  url: '/sys/role',
  method: 'post',
  data: form
})

/**
 * 根据ID获取角色详情
 * @param {*} id
 * @returns
 */
export const reqGetRoleDetail = (id) => request({
  url: `/sys/role/${id}`
})

/**
 * 更新角色
 * @param {*} form
 * @returns
 */
export const reqUpdateRole = (form) => request({
  url: `/sys/role/${form.id}`,
  method: 'put',
  data: form
})

/**
 * 给角色分配权限
 * @param {*} id
 * @param {*} permIds
 * @returns
 */
export const reqAssignPerm = (id, permIds) => request({
  method: 'put',
  url: 'sys/role/assignPrem',
  data: {
    id,
    permIds
  }
})
