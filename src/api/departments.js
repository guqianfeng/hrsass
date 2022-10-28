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
 * 添加部门
 * @param {*} data
 * @returns
 */
export const reqAddDept = (data) => request({
  url: '/company/department',
  method: 'POST',
  data
})

