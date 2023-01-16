import { createRouter, createWebHistory } from 'vue-router';
import profile from './components/profile.vue';
import register from './components/register.vue';
import login from './components/login.vue';
import store from './store/store'

const routes = [
    { path: '/', component: profile, name: 'Profile', meta: { requiresAuth: true } },
    { path: '/register', component: register, name: 'Register', meta: { requiresAuth: false } },
    { path: '/login', component: login, name: 'Login', meta: { requiresAuth: false } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'active'
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLoggedIn) {
        return next("/login")
    }
    if (to.matched.some(record => !record.meta.requiresAuth) && store.getters.isLoggedIn) {
        return next("/")
    }

    next()

})


export default router;
