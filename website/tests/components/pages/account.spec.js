import Account from '../../../src/js/components/pages/account'
import EmptyState from '../../../src/js/components/atoms/empty-state'
import { shallowMount } from "@vue/test-utils"

describe('Account', () => {
    test('It renders an empty state', () => {
        const wrapper = shallowMount(Account)

        expect(wrapper.findComponent(EmptyState).exists()).toBe(true)
    })
})