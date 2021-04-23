import { request } from "../plugins/request";

// 文章列表
const articleList = (params) => {
    return request({
        url: '/api/articles',
        method: 'get',
        params
    })
}

// 我的收藏列表
const getFeedArticles = params => {
    return request({
        method: 'get',
        url: '/api/articles/feed',
        params,
    })
}

// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'post',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消点赞
export const removeFavorite = slug => {
    return request({
        method: 'delete',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticleDetail = slug => {
    return request({
        method: 'get',
        url: `/api/articles/${slug}`
    })
}

// 获取文章标签
export const getTags = () => {
    return request({
        method: 'get',
        url: '/api/tags'
    })
}

// 创建文章
export const createArticles = (data) => {
    return request({
        method: 'post',
        url: '/api/articles',
        data
    })
}

// 个人设置
export const setUser = (data) => {
    return request({
        method: 'put',
        url: '/api/user',
        data
    })
}

export default {
    articleList,
    getFeedArticles,
    addFavorite,
    removeFavorite,
    getArticleDetail,
    getTags,
    createArticles,
    setUser
}
