<template>
    <header class="header">
        <slot></slot>
    </header>
</template>
<script>
export default {
    name: 'AppHeader'
}
</script>
<style lang="scss">
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: $color-green;
    font-weight: bold;
    color: $color-white;
    font-size: $font-size-500;
}
</style>