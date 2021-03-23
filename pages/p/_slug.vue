<template>
  <div v-if="isValidPost()">
    <h1 class="title" v-html="post.title.rendered"></h1>
    <div class="news-content" v-html="post.content.rendered"></div>

    <ul class="list-news">
      <ListPostItem
        v-for="p in random_posts"
        :key="p.id"
        :post="p"
        :random_posts="random_posts"
      />
    </ul>
  </div>
</template>

<script>
import { BASE_API_LINK } from '../../common/utils'
import ListPostItem from '~/components/ListPostItem'

export default {
  name: 'P',
  components: { ListPostItem },
  data() {
    return {
      post: {},
      random_posts: []
    }
  },
  head() {
    const post = this.post
    return this.isValidPost()
      ? {
          title: post.title.rendered,
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')
            },
            {
              hid: 'og:title',
              property: 'og:title',
              content: post.title.rendered
            },
            {
              hid: 'og:site_name',
              property: 'og:site_name',
              content: 'Minimal Blog Nuxt JS + Wordpress API'
            },
            {
              hid: 'og:url',
              property: 'og:url',
              content: process.env.baseUrl + this.$nuxt.$route.fullPath
            },
            {
              hid: 'og:description',
              property: 'og:description',
              content: post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')
            },
            {
              hid: 'og:type',
              property: 'og:type',
              content: 'article'
            },
            {
              hid: 'og:image',
              property: 'og:image',
              content: post._embedded['wp:featuredmedia'][0].source_url
            }
          ]
        }
      : {}
  },
  async asyncData({ $axios, params, error }) {
    console.log('asyncData post single', params)

    if (!params.post) {
      const { slug } = params
      try {
        const res = await $axios.get(
          `${BASE_API_LINK}/wp-json/wp/v2/posts?_embed&slug=${slug}`
        )

        const resRd = await $axios.get(
          `${BASE_API_LINK}/wp-json/wp/v2/posts?_embed&categories=${
            res.data[0].categories[0]
          }`
        )

        if (!res.data.length)
          error({ statusCode: 404, message: 'Post not found!' })
        return {
          post: res.data.length ? res.data[0] : [],
          random_posts: resRd.data.length ? resRd.data : []
        }
      } catch (ex) {
        console.log('parsing failed', ex)
        error({ statusCode: 404, message: ex })
      }
    } else {
      return {
        post: params.post,
        random_posts: params.random_posts
      }
    }
  },
  mounted() {},
  methods: {
    isValidPost() {
      return (
        Object.entries(this.post).length !== 0 &&
        this.post.constructor === Object
      )
    }
  }
}
</script>

<style lang="scss">
.news-content {
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: auto;
  }
}

.ntc-video-container {
  position: relative;
  padding-top: 56.25%;

  embed,
  iframe,
  object {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
  }
}

.crayon-syntax {
  width: 100%;
  overflow: hidden;

  .crayon-main {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;

    .crayon-nums {
      display: none;
    }
  }
}
</style>
