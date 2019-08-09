<template>
  <div id="content" class="about">
    this is about page
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  head() {
    return {
      title: 'About us',
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
