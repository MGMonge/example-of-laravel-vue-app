import NotFound from '../../../src/js/components/pages/not-found'
import EmptyState from '../../../src/js/components/atoms/empty-state'
import { shallowMount } from "@vue/test-utils"

describe('NotFound', () => {
    test('It renders an empty state', () => {
        const wrapper = shallowMount(NotFound)

        expect(wrapper.findComponent(EmptyState).exists()).toBe(true)
    })
})