import AppHeader from '../../../src/js/components/atoms/app-header'
import { shallowMount } from "@vue/test-utils"

describe('AppHeader', () => {
    test('It renders default slot', () => {
        const wrapper = shallowMount(AppHeader, {
            slots: {
                default: 'Units'
            }
        })

        expect(wrapper.text()).toBe('Units')
    })
})