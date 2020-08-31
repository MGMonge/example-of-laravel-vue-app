import axios from 'axios'
import actions from '../../src/js/store/actions'
import mutations from '../../src/js/store/mutations'
import Form from 'form-backend-validation'

describe('actions', () => {
    describe('init()', () => {
        test('It sets the base url based on env variable', async () => {
            process.env.MIX_API_URL = 'https://my-domain.com'
            const dispatch = jest.fn()

            await actions.init({ dispatch })

            expect(axios.defaults.baseURL).toBe('https://my-domain.com')
        })

        test('It fetches the current user information', async () => {
            const dispatch = jest.fn()

            await actions.init({ dispatch })

            expect(dispatch).toHaveBeenCalledWith(actions.fetchCurrentUser.name)
            expect(axios.defaults.headers.common.Authorization).toBe(undefined)
        })

        test('It adds the bearer authorization header if the local storage has an access token', async () => {
            const dispatch = jest.fn()
            localStorage.setItem('token', 'ABC123')

            await actions.init({ dispatch })

            expect(axios.defaults.headers.common.Authorization).toBe('Bearer ABC123')
        })
    })

    describe('fetchCurrentUser()', () => {
        test('It commits the current user if endpoint succeeds', async () => {
            const commit = jest.fn()
            const response = { data: { id: 1 } }
            axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: response }))

            await actions.fetchCurrentUser({ commit })

            expect(axios.get).toHaveBeenCalledWith('/me')
            expect(commit).toHaveBeenCalledWith(mutations.setCurrentUser.name, response.data)
        })

        test('It removes the token from local storage if endpoint fails', async () => {
            const commit = jest.fn()
            axios.get = jest.fn().mockImplementation(() => Promise.reject())
            localStorage.setItem('token', 'ABC123')

            await actions.fetchCurrentUser({ commit })

            expect(axios.get).toHaveBeenCalledWith('/me')
            expect(localStorage.getItem('token')).toBe(null)
        })
    })

    describe('fetchUnits()', () => {
        test('It commits the list of units if endpoint succeeds', async () => {
            const commit = jest.fn()
            const response = { data: [{ id: 1 }] }
            axios.get = jest.fn().mockImplementation(() => Promise.resolve({ data: response }))

            await actions.fetchUnits({ commit })

            expect(axios.get).toHaveBeenCalledWith('/units')
            expect(commit).toHaveBeenCalledWith(mutations.setUnits.name, response.data)
        })
    })

    describe('startUnit()', () => {
        test('It commits the updated unit if endpoint succeeds', async () => {
            const commit = jest.fn()
            const response = { data: [{ id: 1 }] }
            axios.post = jest.fn().mockImplementation(() => Promise.resolve({ data: response }))

            await actions.startUnit({ commit }, response.data[0])

            expect(axios.post).toHaveBeenCalledWith('/units/1/charges')
            expect(commit).toHaveBeenCalledWith(mutations.setUnit.name, response.data)
        })
    })

    describe('stopUnit()', () => {
        test('It throws an error if unit has no charges', () => {
            const commit = jest.fn()
            const unit = { id: 1, charges: [] }

            expect(() => {
                actions.stopUnit({ commit }, unit)
            }).toThrow(Error)
        })

        test('It commits the updated unit if endpoint succeeds', async () => {
            const commit = jest.fn()
            const response = { data: [{ id: 1, charges: [ { id: 2 } ] }] }
            axios.patch = jest.fn().mockImplementation(() => Promise.resolve({ data: response }))

            await actions.stopUnit({ commit }, response.data[0])

            expect(axios.patch).toHaveBeenCalledWith('/units/1/charges/2')
            expect(commit).toHaveBeenCalledWith(mutations.setUnit.name, response.data)
        })
    })

    describe('login()', () => {
        test('It stores the access token to the local storage if endpoint succeeds', async () => {
            const commit = jest.fn()
            const response = { token: 'ABC123' }
            const form = new Form({})
            form.post = jest.fn().mockImplementation(() => Promise.resolve(response))

            await actions.login({ commit }, form)

            expect(form.post).toHaveBeenCalledWith('/login')
            expect(localStorage.getItem('token')).toBe('ABC123')
        })

        test('It adds the bearer authorization header if endpoint succeeds', async () => {
            const commit = jest.fn()
            const response = { token: 'ABC123' }
            const form = new Form({})
            form.post = jest.fn().mockImplementation(() => Promise.resolve(response))

            await actions.login({ commit }, form)

            expect(form.post).toHaveBeenCalledWith('/login')
            expect(axios.defaults.headers.common.Authorization).toBe('Bearer ABC123')
        })

        test('It commits the logged in user if endpoint succeeds', async () => {
            const commit = jest.fn()
            const response = { data: { id: 1 } }
            const form = new Form({})
            form.post = jest.fn().mockImplementation(() => Promise.resolve(response))

            await actions.login({ commit }, form)

            expect(form.post).toHaveBeenCalledWith('/login')
            expect(commit).toHaveBeenCalledWith(mutations.setCurrentUser.name, response.data)
        })
    })
})
