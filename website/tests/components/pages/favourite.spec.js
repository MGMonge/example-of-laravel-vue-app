import Favourite from '../../../src/js/components/pages/favourite'
import EmptyState from '../../../src/js/components/atoms/empty-state'
import { shallowMount } from "@vue/test-utils"

describe('Favourite', () => {
    test('It renders an empty state', () => {
        const wrapper = shallowMount(Favourite)

        expect(wrapper.findComponent(EmptyState).exists()).toBe(true)
    })
})