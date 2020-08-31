<template>
    <svg class="icon" :class="{ [`icon--color-${color}`]: this.color !== null }">
        <use :xlink:href="`#icon--${type}`"></use>
    </svg>
</template>

<script>
export default {
    name: 'Icon',

    props: {
        type: {
            required: true,
            type: String
        },

        color: {
            required: false,
            type: String,
            default: null
        }
    }
}
</script>

<style lang="scss">
    .icon {
        width: 48px;
        height: 48px;
        color: $color-black;
        fill: currentColor;
        stroke: currentColor;

        &--color-green {
            color: $color-green;
        }

        &--color--orange {
            color: $color-orange;
        }

        &--color--white {
            color: $color-white;
        }
    }
</style>