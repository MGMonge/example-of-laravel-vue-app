import mutations from '../../src/js/store/mutations'

describe('mutations', () => {
    describe('appInitialized()', () => {
        test('it sets the `isInitialised` flag to true', () => {
            const state = {
                isInitialised: false
            }

            mutations.appInitialized(state)

            expect(state.isInitialised).toBe(true)
        })
    })

    describe('setCurrentUser()', () => {
        test('it sets the `currentUser` to the state', () => {
            const state = {
                currentUser: null
            }
            const user = { id: 1 }

            mutations.setCurrentUser(state, user)

            expect(state.currentUser).toBe(user)
        })
    })

    describe('setUnits()', () => {
        test('it sets the `units` to the state', () => {
            const state = {
                units: []
            }
            const units = [{ id: 1 }]

            mutations.setUnits(state, units)

            expect(state.units).toBe(units)
        })
    })
})
