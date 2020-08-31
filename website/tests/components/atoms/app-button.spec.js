import AppButton from '../../../src/js/components/atoms/app-button'
import { shallowMount } from "@vue/test-utils"

describe('AppButton', () => {
    test('The `color` is green by default', () => {
        const wrapper = shallowMount(AppButton)

        expect(wrapper.vm.color).toBe('green')
        expect(wrapper.classes('button--color-green')).toBe(true)
    })

    test('The `color` can be changed', () => {
        const wrapper = shallowMount(AppButton, {
            propsData: {
                color: 'orange'
            }
        })

        expect(wrapper.vm.color).toBe('orange')
        expect(wrapper.classes('button--color-orange')).toBe(true)
    })
})