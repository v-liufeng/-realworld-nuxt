<template>
    <div class="home-page">

        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">

                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item" v-if="user">
                                <nuxt-link
                                        class="nav-link"
                                        exact
                                        :class="{ active : checkedType === 'feed'}"
                                        :to="{name: 'home', query: {type: 'feed'}}">Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                        class="nav-link"
                                        exact
                                        :class="{ active : checkedType === 'global'}"
                                        :to="{name: 'home', query: {type: 'global'}}">Global Feed</nuxt-link>
                            </li>
                            <li class="nav-item" v-if="checkedTag">
                                <nuxt-link
                                        class="nav-link"
                                        exact
                                        :class="{ active : checkedType === 'tag'}"
                                        :to="{name: 'home', query: {type: 'tag', tag: checkedTag}}">#{{checkedTag}}</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="(item, index) in articles" :key="index">
                        <div class="article-meta">
                            <nuxt-link :to="{
                                name: 'profile',
                                params: {
                                username: item.author.username
                                }}"
                            ><img :src="item.author.image" /></nuxt-link>
                            <div class="info">
                                <nuxt-link :to="{
                                    name: 'profile',
                                    params: {username: item.author.username}}"
                                    class="author"
                                >{{item.author.username}}</nuxt-link>
                                <span class="date">{{item.createdAt | date('MMM DD, YYYY')}}</span>
                            </div>
                            <button
                                    class="btn btn-outline-primary btn-sm pull-xs-right"
                                    :class="{active: item.favorited }"
                                    @click="onFavorite(item)"
                                    :disabled="item.disabled"
                            >
                                <i class="ion-heart"></i> {{item.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link class="preview-link"
                                   :to="{
                                        name: 'article',
                                        query: {slug: item.slug}
                                   }"
                        >
                            <h1>{{item.title}}</h1>
                            <p>{{item.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>

                    <!--分页-->
                    <nav>
                        <ul class="pagination">
                            <li
                                    class="page-item"
                                    :class="{
                              active: item === page
                            }"
                                    v-for="item in totalPage"
                                    :key="item"
                            >
                                <nuxt-link
                                        class="page-link"
                                        :to="{
                                name: 'home',
                                query: {
                                  page: item,
                                  tag: checkedTag,
                                  type: checkedType
                                }
                              }"
                                >{{ item }}</nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link
                                v-for="(item,index) in tags"
                                :key="index"
                                :to="{
                                    name: 'home',
                                     query: {
                                        type: 'tag',
                                        tag: item
                                      }
                                }"
                                class="tag-pill tag-default"
                            >{{item}}</nuxt-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import _Api from '../../api'
    import { mapState } from 'vuex'

    export default {
        name: "home",
        async asyncData ({ query }) {
            // 处理页面跳转参数
            const checkedTag = query.tag || null
            const checkedType = query.type || 'global'
            const page = Number.parseInt(query.page|| 1)
            const limit = 20
            let articleParams = {
                limit,
                offset: (page - 1) * limit,
            }


            if (checkedType === 'tag') {
                articleParams.tag = checkedTag
            }

            const articlesURl = checkedType === 'feed' ?  _Api.articles.getFeedArticles(articleParams) : _Api.articles.articleList(articleParams)
            // 获取文章列表
            const [ articleList, tagList ] = await Promise.all([articlesURl, _Api.articles.getTags()])
            const { articles, articlesCount } = articleList.data
            const { tags } = tagList.data

            articles.forEach(article => article.disabled = false)
            return {
                articles,
                articlesCount,
                tags,
                checkedTag,
                checkedType,
                page,
                limit
            }
        },
        watchQuery: ['page', 'tag', 'type'],
        computed: {
            ...mapState(['user']),
            totalPage () {
                return Math.ceil(this.articlesCount / this.limit)
            }
        },
        methods: {
            // 点赞和取消点赞
            async onFavorite (art) {
                art.disabled = true
                if (art.favorited) {
                    // 取消点赞
                    await _Api.articles.removeFavorite(art.slug)

                    // 设置数子--
                    art.favoritesCount -= 1
                    art.favorited = false
                } else {
                    // 添加点赞
                    await _Api.articles.addFavorite(art.slug)

                    // 设置数字++
                    art.favoritesCount += 1
                    art.favorited = true

                }
                art.disabled = false
            }
        }
    }
</script>

<style scoped>

</style>
