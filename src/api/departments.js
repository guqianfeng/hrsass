import request from '@/utils/request'

/**
 * 获取所有部门
 * @returns
 */
export const reqGetDepartments = () => {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

/**
 * 根据id删除部门
 */
export const reqDeleteDept = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取员工简单列表
 * @returns
 */
export const reqGetUserSimpleList = () => request({
  url: '/sys/user/simple'
})
