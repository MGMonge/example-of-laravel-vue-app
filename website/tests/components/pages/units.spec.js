import Units from '../../../src/js/components/pages/units'
import UnitItem from '../../../src/js/components/molecules/unit-item'
import Loading from '../../../src/js/components/atoms/loading'
import { shallowMount } from "@vue/test-utils"
import flushPromises from 'flush-promises'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Units', () => {
    test('It fetches the units on created', () => {
        const actions = {
            fetchUnits: jest.fn()
        }
        const store = new Vuex.Store({
            actions
        })

        shallowMount(Units, { store })

        expect(actions.fetchUnits).toHaveBeenCalled()
    })

    test('It has a loading state when fetching units', () => {
        const store = new Vuex.Store({
            actions: {
                fetchUnits: jest.fn()
            }
        })

        const wrapper = shallowMount(Units, { store })

        expect(wrapper.findComponent(Loading).exists()).toBe(true)
    })

    test('It removes the loading state once units are fetched', async () => {
        const store = new Vuex.Store({
            state: {
                units: []
            },
            actions: {
                fetchUnits: () => Promise.resolve()
            }
        })

        const wrapper = shallowMount(Units, { store })
        wrapper.vm.$nextTick()
        await flushPromises()

        expect(wrapper.findComponent(Loading).exists()).toBe(false)
    })

    test('It renders a single unit item', async () => {
        const store = new Vuex.Store({
            state: {
                units: [
                    { id: 1 }
                ]
            },
            actions: {
                fetchUnits: () => Promise.resolve()
            }
        })

        const wrapper = shallowMount(Units, { store })
        wrapper.vm.$nextTick()
        await flushPromises()

        expect(wrapper.findAllComponents(UnitItem).length).toBe(1)
    })

    test('It renders multiple unit items', async () => {
        const store = new Vuex.Store({
            state: {
                units: [
                    { id: 1 },
                    { id: 2 },
                ]
            },
            actions: {
                fetchUnits: () => Promise.resolve()
            }
        })

        const wrapper = shallowMount(Units, { store })
        wrapper.vm.$nextTick()
        await flushPromises()

        expect(wrapper.findAllComponents(UnitItem).length).toBe(2)
    })
})