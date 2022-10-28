import request from '@/utils/request'

export const reqLogin = (loginForm) => {
  return request({
    method: 'POST',
    // url: "http://ihrm-java.itheima.net/api/sys/login",
    url: '/sys/login',
    data: loginForm
  })
}

export const reqGetProfile = () => {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

/**
 * 获取基本信息
 * @param {*} id
 */
export const reqGetBaseInfo = (id) => {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}

/**
 * 获取员工简单列表
 * @returns
 */
export const reqGetUserSimpleList = () => request({
  url: '/sys/user/simple'
})

