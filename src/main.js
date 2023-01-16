// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// styles
import './styles/main.scss'

import store from './store/store'
import router from './router'
import axios from 'axios';


const accessToken = localStorage.getItem('token')

if (accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken
}

const app = createApp({ extends: App })
  .use(store)
  .use(router)


app.mount('#app')


