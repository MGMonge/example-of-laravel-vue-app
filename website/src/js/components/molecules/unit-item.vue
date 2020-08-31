<template>
    <li class="unit">
        <div class="unit__icon" >
            <icon type="location" color="green"></icon>
        </div>
        <div class="unit__details">
            <h2 class="unit__name">{{ unit.name }}</h2>
            <p class="unit__address">{{ unit.address }} - {{ unit.postcode }}</p>
            <p class="unit__charges">{{ totalCharges }}</p>
        </div>
        <div class="unit__actions">
            <span class="unit__status" :class="{'unit__status--charging': isCharging }">{{ unit.status }}</span>
            <app-button v-if="isCharging" @click.native="stop" :disabled="busy" color="orange">Stop</app-button>
            <app-button v-else @click.native="start" :disabled="busy" color="green">Start</app-button>
        </div>
    </li>
</template>
<script>
import Icon from '../atoms/icon'
import AppButton from '../atoms/app-button'
import UnitStatus from '../../helpers/UnitStatus'

export default {
    name: 'UnitItem',

    components: {
        Icon,
        AppButton
    },

    props: {
        unit: {
            required: true,
            type: Object
        }
    },

    data() {
        return {
            busy: false
        }
    },

    methods: {
        start () {
            if (this.busy) {
                return
            }

            this.busy = true

            this.$store.dispatch('startUnit', this.unit).finally(() => {
                this.busy = false
            })
        },

        stop () {
            if (this.busy) {
                return
            }

            this.busy = true

            this.$store.dispatch('stopUnit', this.unit).finally(() => {
                this.busy = false
            })
        }
    },

    computed: {
        isCharging () {
            return this.unit.status === UnitStatus.CHARGING
        },

        totalCharges () {
            const map = {
                0: 'No charges yet',
                1: '1 charge'
            }

            return map[this.unit.charges.length] || `${this.unit.charges.length} charges`
        }
    }
}
</script>
<style lang="scss">
.unit {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $color-gray;
    padding: 0 10px;
    background-color: $color-white;

    &__icon {
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 15px;
    }

    &__details {
        padding: 0 10px;
    }

    &__name {
        font-size: $font-size-400;
        font-weight: bold;
    }

    &__address {
        color: $color-gray;
        font-size: $font-size-300;
    }

    &__charges {
        color: $color-gray;
        font-size: $font-size-200;
        text-align: right;

        @include respond-to(desktop) {
            display: flex;
        }
    }

    &__actions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__status {
        color: $color-green;
        text-transform: uppercase;
        margin-bottom: 10px;

        &--charging {
            color: $color-orange;
        }
    }

    @include respond-to(desktop) {
        justify-content: flex-start;

        &__icon {
            order: 1;
        }

        &__actions {
            order: 2;
            margin-right: 20px;
        }

        &__details {
            order: 3;
        }
    }
}
</style>