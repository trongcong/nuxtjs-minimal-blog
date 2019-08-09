<template>
  <div id="footer">
    <div class="container">
      <div class="wrap">
        <div class="nav">
          <nuxt-link to="/">Home</nuxt-link>
          <nuxt-link to="/blog">Blog</nuxt-link>
          <nuxt-link to="/about">About</nuxt-link>
        </div>
        <div class="copyright">
          &copy; {{ year.getFullYear() }} - Made by
          <a href="https://ntcde.com">NTC </a>, All Right Reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date()
    }
  }
}
</script>

<style scoped lang="scss">
#footer {
  background: #212a39;
  color: #98a5b9;
}

.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 0 20px 0;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }

  a {
    color: inherit;
    transition: 0.3s;

    &:hover,
    &.router-link-exact-active,
    &.nuxt-link-exact-active {
      color: white;
    }
  }

  .nav {
    > a {
      padding: 20px;
      display: inline-block;
    }
  }
}
</style>
