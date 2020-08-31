<template>
    <nav class="navigation">
        <ul class="navigation__list">
            <li class="navigation__item">
                <router-link :to="{ name: 'favourites' }">
                    <icon type="star" :color="$route.name === 'favourites' ? 'green' : null"></icon>
                    Favourites
                </router-link>
            </li>
            <li class="navigation__item">
                <router-link :to="{ name: 'units' }">
                    <icon type="marker" :color="$route.name === 'units' ? 'green' : null"></icon>
                    Units
                </router-link>
            </li>
            <li class="navigation__item">
                <router-link :to="{ name: 'account' }">
                    <icon type="user" :color="$route.name === 'account' ? 'green' : null"></icon>
                    Account
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
import Icon from '../atoms/icon'

export default {
    name: 'Navigation',

    components: {
        Icon
    }
}
</script>

<style lang="scss">
.navigation {
    &__list {
        display: flex;
        justify-content: space-between;
        list-style: none;
        border-top: 1px solid $color-gray;
        background-color: $color-white;
        margin: 0;
        padding: 10px 15px;

        @include respond-to(desktop) {
            justify-content: flex-start;
        }
    }

    &__item {
        a {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: $color-black;
            font-size: $font-size-300;

            &.router-link-active,
            &:hover {
                color: $color-green;

                .icon {
                    color: $color-green;
                }
            }
        }

        @include respond-to(desktop) {
            margin-right: 50px;
        }
    }
}
</style>