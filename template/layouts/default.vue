{{{{raw}}}}
<template lang="pug">
  el-container
    el-header(style='border-bottom:1px solid #ccc')
      span(v-if='me') {{ me.name }}
      span(v-if='isLoggedIn')
        el-button(@click='doLogout', round, type='primary') 登出
    el-container
      el-aside(width='200px',style='border-right:1px solid #ccc;background-color:#eee')
      el-main
        nuxt
        login-form
</template>
{{{{/raw}}}}

<script>
import { mapState } from 'vuex'
import LoginForm from '~/components/LoginForm.vue'

export default {
    components: {
        LoginForm
    },
    computed: mapState({
        isLoggedIn: state => !!state.user.me,
        me: state => state.user.me
    }),
    methods: {
        doneLogin() {
            this.$store.commit('user/doneLogin')
        },
        doLogout() {
            this.$store.dispatch('user/logout')
        }
    },
    mounted() {
        this.$store.dispatch('user/status')
    }
}
</script>

<style lang="stylus">
html
  height 100%

body
  min-height 100%
  padding 0
  margin 0
  display flex

#__nuxt
#__layout
  width 100%
  display flex
  flex-grow 1
</style>
