import Icon from '../../../src/js/components/atoms/icon'
import { shallowMount } from "@vue/test-utils"

describe('Icon', () => {
    test('The `type` prop is required', () => {
        const actual = Icon.props.type.required

        expect(actual).toBe(true)
    })

    test('The `type` prop is must be a string', () => {
        const actual = Icon.props.type.type

        expect(actual).toBe(String)
    })

    test('The `color` prop is null by default', () => {
        const actual = Icon.props.color.default

        expect(actual).toBe(null)
    })

    test('The `color` can be changed', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                type: 'location',
                color: 'green'
            }
        })

        expect(wrapper.vm.color).toBe('green')
        expect(wrapper.classes('icon--color-green')).toBe(true)
    })

    test('It renders the right icon', () => {
        const wrapper = shallowMount(Icon, {
            propsData: {
                type: 'location'
            }
        })

        const actual = wrapper.find('use').attributes('href')

        expect(actual).toBe('#icon--location')
    })
})