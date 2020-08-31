export default {
    appInitialized (state) {
        state.isInitialised = true
    },

    setCurrentUser (state, user) {
        state.currentUser = user
    },

    setUnits (state, units) {
        state.units = units
    },

    setUnit (state, updatedUnit) {
        const index =  state.units.findIndex(unit => unit.id === updatedUnit.id)

        state.units.splice(index, 1, updatedUnit)
    }
}
