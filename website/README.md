# Front-end implementation

---

**Table of Contents**

* [Development environment](#development-environment)
  * [Docker](#docker)
    * [Running commands](#running-commands)
  * [CORS](#cors)
* [Icons](#icons)
* [Middleware](#middleware)

---

<a id="development-environment"></a>
## Development environment

This repo provides a Docker setup to run your production-ready application (distribution) from the `/website/dist` folder. This folder should be where your application is built.

It's up to you to decide if you want to use the Docker setup we provide during the development phase or if you want to use `node` and `npm` directly from your host machine using [http://127.0.0.1:3000](http://127.0.0.1:3000).

> ℹ️ Make sure you are using the latest stable version of `node` and `npm` if you decide to develop using your host machine.

<a id="docker"></a>
### Docker

The Docker service `website` should be able to help you both **run** and **develop** the application. It's shipped with both `nginx` and the latest version of `node` and `npm`.

The `/website` folder at the root will automatically be mounted within your `my-app-website` container (Docker Compose service is called `website`). This container is your web server for your application to run on [http://localhost:8080](http://localhost:8080). The `/website/dist` folder will be your document root which is the main entry point for your application to be served via Docker.

<a id="running-commands"></a>
#### Running commands

You can run any command on any of the services / containers from your host machine:

```
$ docker-compose exec {SERVICE_NAME} {YOUR_COMMAND}
```

For example, the `website` service comes with `npm` pre-installed for Node JS dependencies:

```
$ docker-compose exec website npm
```

The full list of the services we provide and the details for each are listed within the `docker-composer.yml` file located at the root.

<a id="cors"></a>
### CORS

You shouldn't hit any CORS error messages while trying to communicate with your own API but if you do, please read the CORS section from [`api/README.md`](../api/README.md).


---

<a id="icons"></a>
## Icons

#### How to add new icons?
Place your svg icons into `/website/src/icons` and compile the assets with the following command
```
docker-compose exec website npm run dev
```
#### How to use icons?
Let's say you have an icon called `my-icon.svg`. You need to import the `icon` component into your `.vue` component like the example below and pass the icon name as `type`.
```html
<template>
    <div>
        <icon type="my-icon">
    </div>
</template>
<script>
import Icon from '@/components/atoms/icon'

export default {
    components: {
        Icon
    }
}
</script>
```
You can also change the color of your icons by adding the `color` prop
```html
<template>
    <div>
        <icon type="my-icon" color="green">
    </div>
</template>
```
You can check / customise the available colors from the component located at `/website/src/js/components/atoms/icon.vue`

---

<a id="middleware"></a>
## Middleware

#### How to add a middleware to a route?
In order to add a middleware to a route you need to create a file with an exportable function like the following. 

All the middleware files are in `/website/src/js/middleware/` directory
```javascript
export default function auth (context, next) {
    return next(context);
}
```
The variable `context` contains the following:
```javascript
{
    to: {
        ... // The route you are directing to
    }, 
    from: {
        ...  // The previous route
    },  
    next: {
        ...  // The Vue router next() for redirections
    },  
    store: {
         ... // The store object to access anything from the state management object
    }, 
}
```
The second parameter `next` is a callable function to go to the next middleware in the pipeline. Please note that IS NOT the same as the Vue router next. The Vue router next is callable function to redirect to another route or bypass the middleware on current route. You can see an example of this in the `auth` middleware
```javascript
export default function auth (context, next) {
    if (context.store.getters.isNotLoggedIn) {
        return context.next({ name: 'login' })
    }

    return next(context);
}
```
 If user is logged in it will go to the next middleware in the pipeline, but if user is not logged in, it will redirect them to the `/login` route.

Then to include your middleware you can go to the `website/src/js/routes.js` where all your routes resides and add your middleware as metadata like the following example
```javascript
...
 {
        path: '/units',
        name: 'units',
        component: Units,
        meta: {
            title: 'Units',
            middleware: [auth]
        }
    },
...
```
---
Made with ❤️ by Maximiliano Monge
