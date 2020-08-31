import Loading from '../../../src/js/components/atoms/loading'
import { shallowMount } from "@vue/test-utils"

describe('Loading', () => {
    test('It renders', () => {
        const wrapper = shallowMount(Loading)

        expect(wrapper.find('.loading__image').exists()).toBe(true)
    })
})