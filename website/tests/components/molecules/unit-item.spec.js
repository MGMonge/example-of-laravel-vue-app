import UnitItem from '../../../src/js/components/molecules/unit-item'
import AppButton from '../../../src/js/components/atoms/app-button'
import UnitStatus from '../../../src/js/helpers/UnitStatus'
import { shallowMount } from "@vue/test-utils"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('UnitItem', () => {
    test('The `unit` prop is required', () => {
        const actual = UnitItem.props.unit.required

        expect(actual).toBe(true)
    })

    test('The `unit` prop must be an object', () => {
        const actual = UnitItem.props.unit.type

        expect(actual).toBe(Object)
    })

    test('It can be available', () => {
        const wrapper = shallowMount(UnitItem, {
            propsData: {
                unit: {
                    status: UnitStatus.AVAILABLE,
                    charges: []
                }
            }
        })

        expect(wrapper.find('.unit__status').text()).toBe(UnitStatus.AVAILABLE)
        expect(wrapper.findComponent(AppButton).text()).toBe('Start')
    })

    test('It can be charging', () => {
        const wrapper = shallowMount(UnitItem, {
            propsData: {
                unit: {
                    status: UnitStatus.CHARGING,
                    charges: []
                }
            }
        })

        expect(wrapper.find('.unit__status').text()).toBe(UnitStatus.CHARGING)
        expect(wrapper.findComponent(AppButton).text()).toBe('Stop')
    })


    test('Unit without charges', () => {
        const wrapper = shallowMount(UnitItem, {
            propsData: {
                unit: {
                    id: 1,
                    status: UnitStatus.AVAILABLE,
                    charges: []
                }
            }
        })

        const action = wrapper.find('.unit__charges')

        expect(action.text()).toBe('No charges yet')
    })

    test('Unit with single charge', () => {
        const wrapper = shallowMount(UnitItem, {
            propsData: {
                unit: {
                    id: 1,
                    status: UnitStatus.AVAILABLE,
                    charges: [
                        { id: 1 }
                    ]
                }
            }
        })

        const action = wrapper.find('.unit__charges')

        expect(action.text()).toBe('1 charge')
    })

    test('Unit with multiple charges', () => {
        const wrapper = shallowMount(UnitItem, {
            propsData: {
                unit: {
                    id: 1,
                    status: UnitStatus.AVAILABLE,
                    charges: [
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                    ]
                }
            }
        })

        const action = wrapper.find('.unit__charges')

        expect(action.text()).toBe('3 charges')
    })

    test('It can start charging', () => {
        const actions = { startUnit: jest.fn() }
        const store = new Vuex.Store({ actions })
        const wrapper = shallowMount(UnitItem, {
            store,
            propsData: {
                unit: {
                    id: 1,
                    status: UnitStatus.AVAILABLE,
                    charges: []
                }
            }
        })

        wrapper.findComponent(AppButton).trigger('click')

        expect(actions.startUnit).toHaveBeenCalled()
        expect(actions.startUnit.mock.calls[0][1]).toBe(wrapper.props('unit'))
    })

    test('It can stop charging', () => {
        const actions = { stopUnit: jest.fn() }
        const store = new Vuex.Store({ actions })
        const wrapper = shallowMount(UnitItem, {
            store,
            propsData: {
                unit: {
                    id: 1,
                    status: UnitStatus.CHARGING,
                    charges: []
                }
            }
        })

        wrapper.findComponent(AppButton).trigger('click')

        expect(actions.stopUnit).toHaveBeenCalled()
        expect(actions.stopUnit.mock.calls[0][1]).toBe(wrapper.props('unit'))
    })
})