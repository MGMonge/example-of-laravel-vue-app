# Backend API implementation

---

**Table of Contents**

* [Development environment](#development-environment)
* [Running commands](#running-commands)
* [Accessing the database](#accessing-the-database)
  * [From within a Docker service](#from-within-a-docker-service)
  * [From your host machine](#from-your-host-machine)
* [CORS](#cors)

---

<a id="development-environment"></a>
## Development environment

The `/api` folder present at the root will automatically be mounted within your `api` container (Docker Compose service). This container is your web server for your application to run on [http://localhost:8000](http://localhost:8000). The `/api/public` folder will be your document root which is the main entry point for your application to be served.

This project provides a separate MySQL container for you to use as your main database for the API application.

If you wish to use it, a standard Redis container is also available for you to use.

<a id="running-commands"></a>
### Running commands

You can run any command on any of the services / containers from your host machine:

```
$ docker-compose exec {SERVICE_NAME} {YOUR_COMMAND}
```

For example, the `api` service comes with `composer` pre-installed for PHP dependencies:

```
$ docker-compose exec api composer
```

The full list of the services we provide and the details for each are listed within the `docker-composer.yml` file located at the root.

<a id="accessing-the-database"></a>
### Accessing the database

The `db` container running the MySQL database is accessible in two different ways.

<a id="from-within-a-docker-service"></a>
#### From within a Docker service

You application running on the `api` Docker service will need to connect the the `db` Docker service using the following credentials:

* host: `db`
* port: `3306`
* database name: `my-app`
* username: `my-app`
* password: `secret`

<a id="from-your-host-machine"></a>
#### From your host machine

You might need to connect to it using a GUI like [SequelPro](https://www.sequelpro.com) or [TablePlus](https://tableplus.com):

* host: `127.0.0.1`
* port: `33060`
* database name: `my-app`
* username: `my-app`
* password: `secret`

<a id="cors"></a>
### CORS - Cross-Origin Resource Sharing

To avoid CORS issues I use [Laravel CORS Package ](https://github.com/fruitcake/laravel-cors)

It should let you access your own local API served on [http://localhost:8000](http://localhost:8000) from the website (front-end) served on [http://localhost:8080](http://localhost:8080) without any CORS limitation.

---

Made with ❤️ by Maximiliano Monge
