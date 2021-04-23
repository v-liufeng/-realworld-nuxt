
module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes (routes, resolve) {
            // 清除 自定义路由
            routes.splice(0)

            // 重新配置路由
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    children: [
                        {
                            path: '', // home
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/')
                        },
                        {
                            path: '/login', // 登录
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/register', // 注册
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/profile/:username', // 简介
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/')
                        },
                        {
                            path: '/settings', // 设置
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/')
                        },
                        {
                            path: '/create', // 创建文章
                            name: 'create',
                            component: resolve(__dirname, 'pages/create/')
                        },
                        {
                            path: '/editArticle', // 编辑文章
                            name: 'editArticle',
                            component: resolve(__dirname, 'pages/create/')
                        },
                        {
                            path: '/article/:slug', // 文章详情
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/')
                        },
                    ]
                }
            ])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },

    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/day.js'
    ]
}
