{{{{raw}}}}
<template lang="pug">
  el-dialog(:visible.sync='doLogin', v-loading='loading', title='请先登录')
    el-form(:model='loginForm', label-width='80px')
      el-form-item(label='用户名')
        el-input(v-model='loginForm.username', @keyup.enter.native='submitLogin')
      el-form-item(label='密码')
        el-input(v-model='loginForm.password', type='password', @keyup.enter.native='submitLogin')
      el-form-item
        el-button(type='primary', @click='submitLogin') 登录
</template>
{{{{/raw}}}}

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            loginForm: {
                username: null,
                password: null
            },
            loading: false
        }
    },
    computed: mapState({
        doLogin: state => state.user.doLogin
    }),
    methods: {
        submitLogin() {
            this.loading = true
            this.$store
                .dispatch('user/login', {
                    username: this.loginForm.username,
                    password: this.loginForm.password
                })
                .then(() => {
                    this.loading = false
                })
            this.loginForm.username = null
            this.loginForm.password = null
        }
    }
}
</script>
