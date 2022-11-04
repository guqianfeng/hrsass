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

/**
 * 删除员工 ()
 */
export function reqDelEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

/**
 * 新增员工
 * @param {*} form
 * @returns
 */
export function reqAddEmployee(form) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data: form
  })
}

/**
 * 批量导入员工
 * @param {*} arr
 * @returns
 */
export function reqUserBatch(arr) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data: arr
  })
}

// 获取员工基本信息 (包含头像)
export function reqGetUserDetailById(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}

/** *
 * 保存员工的基本信息
 * **/
export function reqSaveUserDetailById(data) {
  return request({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}

/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqGetPersonalDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqUpdatePersonal(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export function reqGetJobDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export function reqUpdateJob(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

/**
 * 给员工分配角色
 * @param {*} id
 * @param {*} roleIds
 * @returns
 */
export const reqAssignRoles = (id, roleIds) => request({
  method: 'PUT',
  url: '/sys/user/assignRoles',
  data: {
    id,
    roleIds
  }
})
