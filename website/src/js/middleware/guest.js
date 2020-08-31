export default function guest (context, next) {
    if (context.store.getters.isLoggedIn) {
        return context.next({ name: 'units' })
    }

    return next(context);
}