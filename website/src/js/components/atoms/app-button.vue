<template>
    <button class="button" :class="{ [`button--color-${color}`]: true }">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'AppButton',

    props: {
        color: {
            type: String,
            default: 'green'
        }
    }
}
</script>
<style lang="scss">
    .button {
        color: $color-white;
        border: 0;
        padding: 10px 20px;
        font-size: $font-size-300;
        font-weight: bold;
        transition: all 0.3s ease;
        cursor: pointer;

        &:disabled {
            opacity: 0.5;
        }

        &--color {
            &-green {
                background-color: $color-green;
            }

            &-orange {
                background-color: $color-orange;
            }
         }
    }
</style>