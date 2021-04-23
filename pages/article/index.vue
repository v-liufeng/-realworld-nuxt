<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">

                <h1>{{article.title}}</h1>

                <user-info :article="article"></user-info>

            </div>
        </div>

        <div class="container page">

            <div class="row article-content">
                <div class="col-md-12">
                    <h2 id="introducing-ionic">{{article.description}}</h2>
                    <p>
                        <span v-html="article.body"></span>
                    </p>
                </div>
            </div>

            <hr />

            <div class="article-actions">
                <user-info :article="article"></user-info>
            </div>

            <div class="row">

                <div class="col-xs-12 col-md-8 offset-md-2">

                    <form class="card comment-form">
                        <div class="card-block">
                            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                        </div>
                        <div class="card-footer">
                            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                            <button class="btn btn-sm btn-primary">
                                Post Comment
                            </button>
                        </div>
                    </form>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text" v-html="article.body"></p>
                        </div>
                        <div class="card-footer">
                            <a href="" class="comment-author">
                                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                            </a>
                            &nbsp;
                            <a href="" class="comment-author">Jacob Schmidt</a>
                            <span class="date-posted">Dec 29th</span>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-block">
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div class="card-footer">
                            <a href="" class="comment-author">
                                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                            </a>
                            &nbsp;
                            <a href="" class="comment-author">Jacob Schmidt</a>
                            <span class="date-posted">Dec 29th</span>
                            <span class="mod-options">
              <i class="ion-edit"></i>
              <i class="ion-trash-a"></i>
            </span>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import _Api from '../../api'
    import MarkdownIt from 'markdown-it'
    import UserInfo from './com/userInfo'

    export default {
        name: "article",
        components: {
            UserInfo
        },
        async asyncData({params}) {
            const { slug } = params
            const { data } = await _Api.articles.getArticleDetail(slug)
            const { article } = data

            // 初始化markdown
            const md = new MarkdownIt()
            article.body = md.render(article.body)
            return {
                article
            }
        },
        head () {
            return {
                title: `${this.article.title} - RealWorld`,
                meta: [
                    { hid: 'description', name: 'description', content: this.article.description }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
