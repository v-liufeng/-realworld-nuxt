<template>
    <div>
        <!--顶部导航栏-->
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" href="index.html">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <nuxt-link class="nav-link"
                                   :to="{ name: 'home'}"
                                   exact
                        >Home</nuxt-link>
                    </li>
                    <li class="nav-item" v-if="user">
                        <nuxt-link
                                class="nav-link"
                                :to="{name: 'create'}"
                        >
                            <i class="ion-compose"></i>&nbsp;New Post
                        </nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link
                                class="nav-link"
                                :to="{
                                   name: 'settings'
                                }"
                        >
                            <i class="ion-gear-a"></i>&nbsp;Settings
                        </nuxt-link>
                    </li>
                    <li class="nav-item" v-if="!user">
                        <nuxt-link
                                class="nav-link"
                                :to="{name: 'login'}"
                        >Sign in</nuxt-link>
                    </li>

                    <li class="nav-item" v-if="!user">
                        <nuxt-link
                                class="nav-link"
                                :to="{name: 'register'}"
                        >Sign up</nuxt-link>
                    </li>

                    <li class="nav-item" v-if="user">
                        <nuxt-link
                                class="nav-link"
                                :to="{
                                    name: 'profile',
                                    params: {username: user.username}

                                }"
                        >{{user.username}}</nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>

        <!--路由组件-->
        <nuxt-child />

        <!--底部导航栏-->
        <footer>
            <div class="container">
                <a href="/" class="logo-font">conduit</a>
                <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
            </div>
        </footer>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "layout",
        computed: {
            ...mapState({user: 'user'})
        }
    }
</script>

<style scoped>

</style>
