const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        user: null, // 用户信息
    }
}

export const mutations = {
    SET_USER(state, user) {
        state.user = user
    }
}


export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)

            try {
                const user = JSON.parse(parsed.user)
                commit('SET_USER', user)
            } catch (e) {
                console.log('*** 存储cookie 报错')
            }
        }
    }
}

