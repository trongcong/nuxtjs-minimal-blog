<template>
  <div v-if="isValidPost()">
    <h1 class="title" v-html="post.title.rendered"></h1>
    <div class="news-content" v-html="post.content.rendered"></div>
  </div>
</template>

<script>
export default {
  name: 'P',
  data() {
    return {
      post: {}
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
  asyncData({ $axios, params, error }) {
    console.log('asyncData post single', params)

    if (!params.post) {
      const slug = params.slug
      return $axios
        .get(`https://techtalk.vn/wp-json/wp/v2/posts?_embed&slug=${slug}`)
        .then((res) => {
          if (!res.data.length)
            error({ statusCode: 404, message: 'Post not found!' })
          return {
            post: res.data.length ? res.data[0] : []
          }
        })
        .catch(function(ex) {
          console.log('parsing failed', ex)
          error({ statusCode: 404, message: ex })
        })
    } else {
      return {
        post: params.post
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
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
