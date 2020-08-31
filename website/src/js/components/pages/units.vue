<template>
    <transition-group name="fade">
        <loading v-if="isLoading" key="units" />
        <ul v-else key="units" class="units">
            <unit-item v-for="unit in units" :key="unit.id" :unit="unit"></unit-item>
        </ul>
    </transition-group>
</template>
<script>
import UnitItem from '../molecules/unit-item'
import Loading from '../atoms/loading'
import { mapState } from 'vuex'

export default {
    name: "Units",

    components: {
        Loading,
        UnitItem
    },

    data () {
        return {
            isLoading: true
        }
    },

    created () {
        this.$store.dispatch('fetchUnits').then(() => {
            this.isLoading = false
        })
    },

    computed: {
        ...mapState(['units'])
    }
}
</script>
<style lang="scss">
    .units {
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>