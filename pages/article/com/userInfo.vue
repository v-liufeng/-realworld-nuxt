<template>
    <div class="article-meta">
        <a href=""><img :src="article.author.image" /></a>
        <div class="info">
            <a href="" class="author">{{article.author.username}}</a>
            <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
        </div>
        <button
                class="btn btn-sm btn-outline-secondary"
                :class="{
                active: article.author.following
                }">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow Eric Simons <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary"
                :class="{
                active: article.author.following
                }">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "userInfo",
        props: {
            article: {
                type: Object,
                default(){
                    return {}
                }
            }
        }
    }
</script>

<style scoped>

</style>
