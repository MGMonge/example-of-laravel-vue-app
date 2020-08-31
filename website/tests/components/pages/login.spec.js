import Login from '../../../src/js/components/pages/login'
import flushPromises from 'flush-promises'
import { mount } from "@vue/test-utils"
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router';

Vue.use(VueRouter)
Vue.use(Vuex)

describe('Login', () => {
    test('It attempts to login when sending form', () => {
        const actions = {
            login: jest.fn().mockImplementation(() => Promise.reject())
        }
        const store = new Vuex.Store({
            actions
        })
        const wrapper = mount(Login, { store })

        wrapper.find('form').trigger('submit')

        expect(actions.login).toHaveBeenCalled()
    })

    test('It redirects the units route if login succeeds', async () => {
        const router = new VueRouter()
        router.push = jest.fn()
        const actions = {
            login: jest.fn().mockImplementation(() => Promise.resolve())
        }
        const store = new Vuex.Store({
            actions
        })
        const wrapper = mount(Login, { store, router })
        wrapper.find('form').trigger('submit')
        await flushPromises()

        expect(actions.login).toHaveBeenCalled()
        expect(router.push).toHaveBeenCalledWith({ name: 'units' })
        wrapper.destroy()
    })
})