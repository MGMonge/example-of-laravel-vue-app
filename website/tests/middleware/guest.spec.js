import guest from "../../src/js/middleware/guest";

describe('guest', () => {
    test('It redirects to units route if user authenticated', () => {
        const next = () => 'NEXT'
        const context = {
            store: {
                getters: {
                    isLoggedIn: true
                }
            },
            next (route) {
                return route.name
            }
        }

        const actual = guest(context, next)

        expect(actual).toBe('units')
    })

    test('It goes to next middleware if user is not logged in', () => {
        const next = () => 'NEXT'
        const context = {
            store: {
                getters: {
                    isLoggedIn: false
                }
            }
        }

        const actual = guest(context, next)

        expect(actual).toBe('NEXT')
    })
})
