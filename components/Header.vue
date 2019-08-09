<template>
  <div id="nav">
    <div class="container">
      <div class="wrap">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
#nav {
  position: sticky;
  top: 0;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  background-color: white;
  z-index: 9;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active,
    &.nuxt-link-exact-active {
      color: #42b983;
    }
  }

  .wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    > a {
      padding: 20px;
    }
  }
}
</style>
