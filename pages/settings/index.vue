<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <form @submit.prevent="onSetUser">
                        <fieldset>
                            <fieldset>
                                <ul class="error-messages">
                                    <template v-for="error in errors">
                                        <li>
                                            {{error}}
                                        </li>
                                    </template>
                                </ul>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="formUsers.image">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="formUsers.username">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="formUsers.bio"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="formUsers.email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="password" placeholder="new Password" v-model="formUsers.password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import _Api from "../../api";
    import { mapState, mapMutations } from 'vuex'

    export default {
        name: "setting",
        data() {
            return {
                formUsers: {},
                errors: []
            }
        },
        computed: {
            ...mapState({user: 'user'})
        },

        mounted() {
            this.formUsers = {...this.user}
        },
        methods: {
            ...mapMutations(['SET_USER']),
            async onSetUser () {
                try {
                    const {data} = await _Api.articles.setUser(this.formUsers)
                    this.SET_USER(data.user)
                    this.$router.push({path: `profile/${data.user.username}`})
                } catch (e) {
                    this.errors = e.response.data.errors.body
                }
            }
        }
    }
</script>

<style scoped>

</style>
