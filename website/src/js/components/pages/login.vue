<template>
    <form class="form" @submit.prevent="submit">
        <h1 class="form__title">Sign in</h1>
        <div class="form__group" :class="{ 'has-errors': form.errors.has('email') }">
            <label for="email" class="form__label">Email Address</label>
            <input id="email" class="form__input" type="text" v-model="form.email" />
            <span v-if="form.errors.has('email')" v-html="form.errors.first('email')" class="form__help-block"></span>
        </div>
        <div class="form__group" :class="{ 'has-errors': form.errors.has('password') }">
            <label for="password" class="form__label">Password</label>
            <input id="password" class="form__input" type="password" v-model="form.password" />
            <span v-if="form.errors.has('password')" v-html="form.errors.first('password')" class="form__help-block"></span>
        </div>
        <app-button class="form__button" type="submit" :disabled="form.processing">
            Login
        </app-button>
    </form>
</template>
<script>
import AppButton from '../atoms/app-button'
import Form from 'form-backend-validation'

export default {
    name: 'Login',

    components: {
        AppButton
    },

    data() {
        return {
            form: new Form({
                email: '',
                password: ''
            })
        }
    },

    methods: {
        submit () {
            this.$store.dispatch('login', this.form).then(() => {
                this.$router.push({ name: 'units'})
            }).catch(() => {
                // Maybe handle this nicely if we have a  500
            })
        }
    }
}
</script>
<style lang="scss">
.form {
    display: flex;
    height: calc(100% - 30px);
    width: calc(100% - 30px);
    max-width: 350px;
    padding: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    &__group {
        width: 100%;
        margin-bottom: 10px;
    }

    &__label {
        display: block;
        margin-bottom: 10px;
    }

    &__input {
        width: calc(100% - 20px);
        border: 1px solid $color-gray;
        border-radius:  5px;
        transition: all 0.3s ease;
        padding: 15px 10px;
    }

    &__help-block {
        display: block;
        transition: all 0.3s ease;
        margin: 10px 0;
    }

    &__button {
        margin-top: 15px;
        width: 100%;
        padding: 15px;
    }
}
</style>