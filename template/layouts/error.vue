{{{{raw}}}}
<template lang="pug">
  section.container
    h1.title {{ error.statusCode }}
    h2.info {{ error.message }}
    nuxt-link.button(to='/', v-if='error.statusCode === 404') Homepage
</template>
{{{{/raw}}}}
<script>
export default {
    props: ['error']
}
</script>

<style scoped lang="stylus">
.title
  margin-top 15px
  font-size 5em

.info
  font-weight 300
  color #9aabb1
  margin 0

.button
  margin-top 50px
</style>
