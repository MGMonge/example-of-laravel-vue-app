<template>
    <div class="initialising">
        <h1 class="initialising__title">My App</h1>
        <img class="initialising__image" src="/images/ball-triangle.svg" alt="Initializing">
    </div>
</template>

<script>
export default {
    name: 'Initializing'
}
</script>

<style lang="scss">
.initialising {
    display: flex;
    flex-direction: column;
    background-color: $color-green;
    color: $color-white;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    &__title {
        font-size: $font-size-600;
    }

    &__image {
        width: 100px;
    }
}
</style>