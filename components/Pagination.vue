<template>
  <nav class="pagination">
    <ul>
      <template v-for="index in totalPages">
        <li v-if="index !== currentPage" :key="index">
          <NuxtLink
            :to="{
              name: 'blog',
              query: index !== 1 ? { page: index } : {}
            }"
          >
            {{ index }}
          </NuxtLink>
        </li>
        <li v-else :key="index" class="current">
          <a href="javascript:void(0);">{{ index }}</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: { type: Number, default: 0 }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  text-align: center;

  ul {
    margin: 20px 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    li {
      a {
        color: black;
        float: left;
        padding: 6px 14px;
        text-decoration: none;
        transition: background-color 0.3s;
        border: 1px solid #ddd;

        &:hover {
          background-color: #ddd;
        }
      }

      &.current {
        a {
          background-color: #4dba87;
          color: white;
          border: 1px solid #4dba87;
        }
      }
    }
  }
}
</style>
