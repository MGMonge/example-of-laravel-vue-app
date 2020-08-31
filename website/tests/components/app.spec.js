import App from '../../src/js/components/app'
import Initialising from '../../src/js/components/atoms/initialising'
import AppHeader from '../../src/js/components/atoms/app-header'
import Navigation from '../../src/js/components/molecules/navigation'
import { createLocalVue, shallowMount } from "@vue/test-utils"
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('App', () => {
    test('It shows the initialising component if app has not initialised', () => {
        const store = new Vuex.Store({
            state: {
                isInitialised: false
            }
        })
        const wrapper = shallowMount(App, { store, localVue })

        expect(wrapper.findComponent(Initialising).exists()).toBe(true)
        expect(wrapper.findComponent(AppHeader).exists()).toBe(false)
        expect(wrapper.findComponent(Navigation).exists()).toBe(false)
    })

    test('It shows the app when initialised', () => {
        const store = new Vuex.Store({
            state: {
                isInitialised: true
            },
            getters: {
                isLoggedIn: () => true
            }
        })
        const $route = {
            path: 'account', meta: { title: 'Account' }
        }
        const wrapper = shallowMount(App, { store, localVue, mocks: { $route }, stubs: ['router-view'] })

        expect(wrapper.findComponent(Initialising).exists()).toBe(false)
        expect(wrapper.findComponent(AppHeader).exists()).toBe(true)
        expect(wrapper.findComponent(Navigation).exists()).toBe(true)
    })

    test('It does not show the navigation if user is not logged in', () => {
        const store = new Vuex.Store({
            state: {
                isInitialised: true
            },
            getters: {
                isLoggedIn: () => false
            }
        })
        const $route = {
            path: 'login', meta: { title: 'Login' }
        }
        const wrapper = shallowMount(App, { store, localVue, mocks: { $route }, stubs: ['router-view'] })

        expect(wrapper.findComponent(AppHeader).exists()).toBe(true)
        expect(wrapper.findComponent(Navigation).exists()).toBe(false)
    })
})