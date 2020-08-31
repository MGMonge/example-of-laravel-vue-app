<template>
    <div class="loading">
        <img class="loading__image" src="/images/puff.svg" alt="Loading">
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style lang="scss">
.loading {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    &__image {
        fill: green;
        width: 100px;
    }
}
</style>