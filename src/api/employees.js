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
