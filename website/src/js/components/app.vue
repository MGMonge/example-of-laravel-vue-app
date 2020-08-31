<template>
    <transition-group name="fade">
        <initialising v-if="isInitialised === false" key="initialising"></initialising>
        <div v-else key="app" class="layout">
            <app-header class="layout__header">
                {{ $route.meta.title }}
            </app-header>
            <div class="layout__content">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </div>
            <navigation v-if="isLoggedIn" class="layout__navigation" />
        </div>
    </transition-group>
</template>
<script>
import AppHeader from './atoms/app-header'
import Navigation from './molecules/navigation'
import Initialising from './atoms/initialising'
import { mapState, mapGetters } from 'vuex'

export default {
    components: {
        AppHeader,
        Navigation,
        Initialising
    },

    computed: {
        ...mapState(['isInitialised']),
        ...mapGetters(['isLoggedIn'])
    }
}
</script>
<style lang="scss">
    .layout {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;

        &__content {
            background-color: $color-bluelight;
            height: 100%;
            max-height: 100%;
            overflow: auto;
        }
    }
</style>