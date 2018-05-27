import axios from '~/plugins/axios'

export const state = () => ({
    me: null,
    doLogin: false
})

export const mutations = {
    login(state, user) {
        state.me = user
        state.doLogin = false
    },
    logout(state) {
        state.me = null
        state.doLogin = true
    },
    doLogin(state) {
        state.doLogin = true
    },
    doneLogin(state) {
        state.doLogin = false
    }
}

export const actions = {
    async login({ commit, redirect }, { username, password }) {
        try {
            let res = await axios.post('/api/user/login', {
                username: username,
                password: password
            })
            commit('login', res.data)
        } catch (e) {
            commit('logout')
        }
    },
    async logout({ commit }) {
        await axios.post('/api/user/logout')
        commit('logout')
    },
    async status({ commit }) {
        try {
            let { data } = await axios.get('/api/user/status')
            commit('login', data)
        } catch (e) {
            commit('doLogin')
        }
    }
}
