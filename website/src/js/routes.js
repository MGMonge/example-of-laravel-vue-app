import Units  from './components/pages/units'
import Favourites  from './components/pages/favourite'
import Account  from './components/pages/account'
import Login  from './components/pages/login'
import NotFound  from './components/pages/not-found'
import auth from './middleware/auth'
import guest from './middleware/guest'

export default [
    {
        path: '/',
        redirect: '/units'
    },
    {
        path: '/units',
        name: 'units',
        component: Units,
        meta: {
            title: 'Units',
            middleware: [auth]
        }
    },
    {
        path: '/favourites',
        name: 'favourites',
        component: Favourites,
        meta: {
            title: 'Favourites',
            middleware: [auth]
        }
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        meta: {
            title: 'Account',
            middleware: [auth]
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
            middleware: [guest]
        }
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: 'Page not found'
        }
    },
]