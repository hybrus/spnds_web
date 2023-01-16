import { createStore } from 'vuex'
import axios from 'axios'
import moment from 'moment/moment'

export default createStore({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user'))
    },

    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },

        AUTH_SUCCESS(state, data) {
            state.status = 'success'
            state.token = data.token
            state.user = data.user
        },

        AUTH_ERROR(state) {
            state.status = 'error'
        },

        AUTH_LOGOUT(state) {
            state.status = ''
            state.token = ''
            state.user = null
        },

    },

    actions: {
        LOGIN({ commit }, user) {

            return new Promise((resolve, reject) => {

                commit('AUTH_REQUEST')
                axios.post('http://localhost:8000/api/auth/login', {

                    email: user.email,
                    password: user.password

                })

                    .then(response => {

                        const token = response.data.token
                        const user = {
                            ...response.data.user,
                            last_logged_in: moment().toString(),
                            email_verified_at: response.data.user?.email_verified_at && moment(response.data.user?.email_verified_at).toString(),
                            created_at: moment(response.data.user?.created_at).toString(),
                            updated_at: moment(response.data.user?.updated_at).toString(),
                        }

                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))

                        axios.defaults.headers.common['Authorization'] = "Bearer" + token
                        commit('AUTH_SUCCESS', { token: token, user: user })

                        resolve(response)

                    }).catch(err => {

                        commit('AUTH_ERROR')
                        localStorage.removeItem('token')

                        reject(err)

                    })
            })
        },

        REGISTER({ commit }, user) {

            return new Promise((resolve, reject) => {

                commit('AUTH_REQUEST')
                axios.post('http://localhost:8000/api/auth/register', {

                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.password_confirmation,

                })

                    .then(response => {

                        const token = response.data.token
                        const user = {
                            ...response.data.user,
                            last_logged_in: moment().toString(),
                            email_verified_at: response.data.user?.email_verified_at && moment(response.data.user?.email_verified_at).toString(),
                            created_at: moment(response.data.user?.created_at).toString(),
                            updated_at: moment(response.data.user?.updated_at).toString(),
                        }
                        commit('AUTH_SUCCESS', { token: token, user: user })

                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))

                        axios.defaults.headers.common['Authorization'] = "Bearer" + token

                        resolve(response)

                    }).catch(err => {

                        commit('AUTH_ERROR')
                        localStorage.removeItem('token')

                        reject(err)

                    })
            })
        },

        LOGOUT({ commit }) {
            return new Promise((resolve) => {
                commit('AUTH_LOGOUT')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },

    getters: {
        isLoggedIn: state => !!state.token,
        user: state => state.user,
        authStatus: state => state.status,
    },

    modules: {
    }
})