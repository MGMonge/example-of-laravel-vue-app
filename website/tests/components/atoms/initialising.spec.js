import Initialising from '../../../src/js/components/atoms/initialising'
import { shallowMount } from "@vue/test-utils"

describe('Initialising', () => {
    test('It renders', () => {
        const wrapper = shallowMount(Initialising)

        expect(wrapper.find('.initialising__title').text()).toBe('My App')
        expect(wrapper.find('.initialising__image').exists()).toBe(true)
    })
})