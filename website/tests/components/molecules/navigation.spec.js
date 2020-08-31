import Navigation from '../../../src/js/components/molecules/navigation'
import { shallowMount, RouterLinkStub } from "@vue/test-utils"

describe('Navigation', () => {
    test('It renders the main navigation', () => {
        const $route = {
            path: 'favourites', meta: { title: 'Favourites' }
        }
        const wrapper = shallowMount(Navigation, { stubs: { RouterLink: RouterLinkStub }, mocks: { $route } })

        const actual = wrapper.findAllComponents(RouterLinkStub);

        expect(actual.length).toBe(3)
        expect(actual.at(0).vm.to.name).toBe('favourites')
        expect(actual.at(1).vm.to.name).toBe('units')
        expect(actual.at(2).vm.to.name).toBe('account')
    })
})