<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign up</h1>
                    <p class="text-xs-center">
                        <a href="">Have an account?</a>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(error, filed) in errors">
                            <li v-for="(item, key) in error" :key="key">
                                {{filed}} {{item}}
                            </li>
                        </template>
                    </ul>

                    <form @submit.prevent="onButton">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input class="form-control form-control-lg" required v-model="user.username" type="text" placeholder="Your Name">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" required v-model="user.email" type="email" placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" required v-model="user.password" type="password" placeholder="Password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{isLogin ? 'Sign in' : 'Sing up'}}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import _Api from '../../api'
    import { mapMutations } from 'vuex'
    const cookie = process.client ? require('js-cookie') : undefined

    export default {
        name: "login",
        computed: {
            isLogin() {
                return this.$route.name === 'login'
            }
        },
        data() {
            return {
                user: {},
                errors: {} // 保存错误信息
            }
        },
        methods: {
            ...mapMutations(['SET_USER']),
            // 触发登录按钮
            async onButton () {
                try {
                    const { data } = this.isLogin ? await this.login() : await this.regist()

                    this.SET_USER(data.user)
                    cookie.set('user', JSON.stringify(data.user))
                    // 跳转回首页
                    this.$router.push({name: 'home'})
                } catch (e) {
                    this.errors = e.response.data.errors
                }
            },

            // 登录
            login () {
                 return _Api.login.login({user: this.user})
            },

            // 注册
            regist () {
                return _Api.login.registration({user: this.user})
            }
        }
    }
</script>

<style scoped>

</style>
