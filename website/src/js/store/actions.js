import axios from 'axios'

export default {
    init ({ dispatch }) {
        axios.defaults.baseURL = process.env.MIX_API_URL

        const token = localStorage.getItem('token')

        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
        }

        return dispatch('fetchCurrentUser')
    },

    fetchCurrentUser ({ commit }) {
        return axios.get('/me')
            .then(response => {
                commit('setCurrentUser', response.data.data)
            }).catch(() => {
                localStorage.removeItem('token')
            })
    },

    fetchUnits ({ commit }) {
        return axios.get('/units')
            .then(response => {
                commit('setUnits', response.data.data)
            })
    },

    startUnit ({ commit }, unit) {
        return axios.post(`/units/${unit.id}/charges`).then((response) => {
            commit('setUnit', response.data.data)
        })
    },

    stopUnit ({ commit }, unit) {
        if (unit.charges === undefined || unit.charges.length < 1) {
            throw new Error(`Cannot stop unit [${unit.id}] because it has no charges.`)
        }

        return axios.patch(`/units/${unit.id}/charges/${unit.charges[0].id}`).then((response) => {
            commit('setUnit', response.data.data)
        })
    },

    login ({ commit }, form) {
        return form.post('/login').then(response => {
            localStorage.setItem('token', response.token)
            axios.defaults.headers.common.Authorization = `Bearer ${response.token}`

            commit('setCurrentUser', response.data)
        })
    }
}
