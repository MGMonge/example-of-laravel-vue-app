<template>
    <div class="empty">
        <img class="empty__image" src="/images/empty-state.svg" alt="">
        <h1 class="empty__title"><slot></slot></h1>
    </div>
</template>
<script>
export default {
    name: 'EmptyState'
}
</script>
<style lang="scss">
    .empty {
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &__title {
            text-align: center;
        }
    }
</style>