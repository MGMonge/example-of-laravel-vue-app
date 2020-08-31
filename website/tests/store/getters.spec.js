import getters from '../../src/js/store/getters'

describe('getters', () => {
    describe('isLoggedIn()', () => {
        test('it returns true if current user is in the state', () => {
            const state = {
                currentUser: {}
            }

            const actual = getters.isLoggedIn(state)

            expect(actual).toBe(true)
        })

        test('it returns false if current user is not in the state', () => {
            const state = {
                currentUser: null
            }

            const actual = getters.isLoggedIn(state)

            expect(actual).toBe(false)
        })
    })

    describe('isNotLoggedIn()', () => {
        test('it returns the inverse if isLoggedIn()', () => {
            expect(getters.isNotLoggedIn({}, { isLoggedIn: true })).toBe(false)
            expect(getters.isNotLoggedIn({}, { isLoggedIn: false })).toBe(true)
        })
    })
})
