export default function auth (context, next) {
    if (context.store.getters.isNotLoggedIn) {
        return context.next({ name: 'login' })
    }

    return next(context);
}