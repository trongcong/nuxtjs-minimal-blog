<template>
  <li class="news-item">
    <span class="__first-char">{{ post.title.rendered.charAt(0) }}</span>
    <NuxtLink
      class="__title"
      :to="{
        name: 'p-slug',
        params: { post: post, slug: post.slug, random_posts: randomPosts }
      }"
      v-html="post.title.rendered"
    ></NuxtLink>
    <br />
    <span class="__meta">
      <span class="by"
        >by
        <a target="_blank" :href="post._embedded.author[0].link" class="">{{
          post._embedded.author[0].name
        }}</a>
      </span>
      <span class="time"> {{ timeAgo }}</span>
      <span class="comments-link">
        |
        <a target="_blank" :href="[post.link + '#comments']" class=""
          >open comments</a
        >
      </span>
    </span>
  </li>
</template>

<script>
import { timeAgo, getTimestamp } from '~/common/utils'
export default {
  name: 'ListPostItem',
  props: {
    post: {
      type: Object,
      default: () => {}
    },
    randomPosts: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    timeAgo() {
      const time = getTimestamp(this.post.date)
      return timeAgo(time)
    }
  }
}
</script>

<style scoped lang="scss">
.news-item {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;

  .__first-char {
    color: #f60;
    font-size: 1.1em;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -10px;
  }

  .__title {
    color: #34495e;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
      color: #000000;
    }
  }

  .__meta {
    font-size: 14px;
    color: #3e3e3e;
    display: block;

    a {
      color: #828282;
      text-decoration: underline;
      transition: 0.3s;

      &:hover {
        color: #4dba87;
      }
    }
  }
}
</style>
