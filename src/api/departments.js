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

/** *
 * 获取部门详情
 * ***/
export function reqGetDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 编辑部门详情
 * @param {*} form
 * @returns
 */
export function reqUpdateDeptDetail(form) {
  return request({
    url: `/company/department/${form.id}`,
    method: 'PUT',
    data: form
  })
}
