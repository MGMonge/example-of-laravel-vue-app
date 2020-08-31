import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './components/App'
import Pipeline from './helpers/Pipeline'

Vue.use(Vuex)
Vue.use(VueRouter)

// Globally registering the main app component
Vue.component('app', App)

const router = new VueRouter({
    mode: 'history',
    routes,
})

const store = new Vuex.Store(require('./store').default)

// Before each route we run this global middleware to initialise the store
// @see js/store/actions.js
router.beforeEach((to, from, next) => {
    if (store.state.isInitialised === false) {
        return store.dispatch('init').then(() => {
            store.commit('appInitialized')
            return next()
        })
    }

    return next()
})

// We run individual middleware if current route has any
router.beforeEach((to, from, next) => {
    const context = { to, from, next, store }

    return (new Pipeline)
        .send(context)
        .through(to.meta.middleware || [])
        .then(() => {
            return next()
        })
})

new Vue({
    el: '#app',
    store,
    router
})