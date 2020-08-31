import auth from "../../src/js/middleware/auth";

describe('auth', () => {
    test('It redirects to login route if user is not authenticated', () => {
        const next = () => 'NEXT'
        const context = {
            store: {
                getters: {
                    isNotLoggedIn: true
                }
            },
            next (route) {
                return route.name
            }
        }

        const actual = auth(context, next)

        expect(actual).toBe('login')
    })

    test('It goes to next middleware if user is logged in', () => {
        const next = () => 'NEXT'
        const context = {
            store: {
                getters: {
                    isNotLoggedIn: false
                }
            }
        }

        const actual = auth(context, next)

        expect(actual).toBe('NEXT')
    })
})
