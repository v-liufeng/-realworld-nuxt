import { request } from "../plugins/request";

// 登录
const login = (users) => {
    return request({
        url: '/api/users/login',
        method: 'post',
        data: users
    })
}

// 注册
const registration = (users) => {
    return request({
        url: '/api/users',
        method: 'post',
        data: users
    })
}

// 获取个人资料

const getUserInfo = (username) => {
    return request({
        url: `/api/profiles/${username}`,
        method: 'get',
    })
}

export default {
    login,
    registration,
    getUserInfo
}
