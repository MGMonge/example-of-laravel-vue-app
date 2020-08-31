import EmptyState from '../../../src/js/components/atoms/empty-state'
import { shallowMount } from "@vue/test-utils"

describe('EmptyState', () => {
    test('It renders', () => {
        const wrapper = shallowMount(EmptyState, {
            slots: {
                default: 'Nothing to see here...'
            }
        })

        expect(wrapper.find('.empty__image').exists()).toBe(true)
        expect(wrapper.find('.empty__title').text()).toBe('Nothing to see here...')
    })
})