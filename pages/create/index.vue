<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form>
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
                                <input type="text" required class="form-control form-control-lg" placeholder="Article Title" v-model="formArticles.title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" required class="form-control" placeholder="What's this article about?" v-model="formArticles.description">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control" required rows="8" placeholder="Write your article (in markdown)" v-model="formArticles.body"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control" placeholder="Enter tags"><div class="tag-list" v-model="formArticles.tagList"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="addArticles">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import _Api from '../../api'
    export default {
        name: "create",
        data() {
            return {
                formArticles: {},
                errors: []
            }
        },
        methods: {
            async addArticles () {
                try {
                    const {data} = await _Api.articles.createArticles(this.formArticles)
                    this.$router.push({path: `article/${data.article.slug}`})
                } catch (e) {
                    this.errors = e.response.data.errors.body
                }
            }
        }
    }
</script>

<style scoped>

</style>
