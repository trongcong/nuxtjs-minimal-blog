<template>
  <div>
    <div class="list-news-wrap">
      <ul class="list-news">
        <ListPostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :random_posts="random_posts"
        />
      </ul>
      <Pagination :current-page="currentPage" :total-pages="totalPages" />
    </div>
  </div>
</template>

<script>
import ListPostItem from '~/components/ListPostItem'
import Pagination from '~/components/Pagination.vue'
import { getRandomArrayElement } from '~/common/utils'

export default {
  name: 'Blog',
  components: { ListPostItem, Pagination },
  key: (to) => to.fullPath,
  watchQuery: ['page'],
  data() {
    return {
      posts: [],
      random_posts: [],
      currentPage: 1,
      totalPosts: 0,
      totalPages: 0,
      title: 'Blog'
    }
  },
  asyncData({ $axios, query, error }) {
    const page = +query.page || 1
    return $axios
      .get(
        `https://techtalk.vn/wp-json/wp/v2/posts?_embed&page=${page}&per_page=20`
      )
      .then((res) => {
        return {
          posts: res.data,
          totalPosts: +res.headers['x-wp-total'],
          totalPages: +res.headers['x-wp-totalpages'],
          currentPage: +page,
          random_posts: getRandomArrayElement(res.data, 10),
          title:
            'Result page ' +
            +page +
            ' of ' +
            +res.headers['x-wp-totalpages'] +
            ' for Blog'
        }
      })
      .catch((e) => {
        console.log('request failed', e)
        error({ statusCode: 404, message: e })
      })
  },
  transition(to, from) {
    if (!from) {
      return 'page'
    }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        // {
        //   hid: 'description',
        //   name: 'description',
        //   content: 'My custom description'
        // }
      ]
    }
  }
}
</script>

<style lang="scss">
.list-news {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
