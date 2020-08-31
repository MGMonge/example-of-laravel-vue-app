# Example of a Production Ready Application
This repository is meant to be used for inspiration / scaffolding of your own app with the following tech stack: 
- Docker
- Laravel
- Laravel Passport
- Vue 
- Vuex
- Vue Router

# Why?
There is a lot of documentation about the technologies listed above, but how do I integrate them all into a single app? Where should I start? How do I structure my app? How do I test my app? What should I test? How do I test the frontend?
These are just some of the questions you might have when facing a new project. That's why I thought of starting this repository to help you out with all the above and more.

**Note**: If you have any question / comments you can contact me at [mgmonge92@gmail.com](mailto:mgmonge92@gmail.com)

---

**Table of Contents**

* [Presentation](#presentation)
* [About this documentation](#about-documentation)
* [Prerequisites](#prerequisites)
* [Setup your environment](#setup-your-environment)
* [Production ready](#production-ready)
* [Implementation](#implementation)
  * [Backend](api/README.md)
  * [Frontend](website/README.md)
* [How to run the tests](#tests)

---

<a id="presentation"></a>
## Presentation

This project came from one of the technical tests I've done in the past that gave me a lot of inspiration to convert it into something helpful. I don't normally write documentation for these type of tests and they get lost in my Github forever, but I thought this one was perfect to share how to craft a production ready app.

The app is very simple, it has the api backend side (built with Laravel) which is consumed by the SPA frontend (built with Vue / Vuex)

The app has an authentication layer and once you're logged in you can navigate through the different pages, the main page is the `Units` page which is a list of items with 2 possible status `Available` or `Charging` and you can toggle these while counting the times you "charged" each unit, the other pages are just an empty state showing `Coming soon`. Please see it working in the following gif:

<p align="center">
    <img src="/docs/app.gif" />
</p>

⚠️ **Important**: The content of the app is just for inspiration, it's totally customisable and you can built your own things on top

---

<a id="about-documentation"></a>
## About this documentation
It is important to mention that I'm using the docker containers with their documentation provided on the technical test I based this project from.

---

<a id="prerequisites"></a>
## Prerequisites

- `git`built in macOS | Git Bash for [Windows](https://git-scm.com/download/win)
- `make`built in macOS | [Windows](https://gist.github.com/evanwill/0207876c3243bbb6863e65ec5dc3f058#make)
- Docker Desktop [macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac) | [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

<a id="setup-your-environment"></a>
## Setup your environment

As part of this repository you'll have a dockerised environment using `docker-compose`. Here are the services included:

* **API - Back End**
  * `api` nginx 1.14 + PHP 7.4 - to run the API application
  * `db` MySQL 5.7 - to store the API application data
  * `redis` Redis 5.0 **optional** - for sessions, caching, queues...
* **Website - Front End**
  * `website` nginx 1.14 + latest NodeJS - to run the compiled front-end Website

All you have to do to get it up and running is running `make start` from the root. This will spin up the following:

- API: [http://localhost:8000](http://localhost:8000)
- Website: [http://localhost:8080](http://localhost:8080)

Additional commands are available, simply run `make` from the root to see the list of the commands you can use to manage your environment.

All the services available are using the same Docker network and can communicate with one another. Simply use the service name instead of an IP address or a host name when configuring your applications.

⚠️ Make sure you don't have any other server running at the same time using the same ports. We use the following ports: `8000`, `8080`, `33060` and `6379`. If you do, feel free to either adapt our `docker-compose.yml` file or shutdown whatever program is currently using these.

<a id="production-ready"></a>
## Production Ready
In order to get the application up & running you will need to follow the steps below:
####  1. Start the environment.
```$xslt
make start
```

####  2. Make sure you have the environment files in your repo
On the `api` directory copy the  `.env.example` to `.env`
```$xslt
cd api
cp .env.example .env
```
On the `website` directory copy the `.env.example` to `.env`
```$xslt
cd website
cp .env.example .env
```
The default values should be fine, but you can change them if you wish

####  3. Build the app
Now you environment is setup and running you can build your production ready app with the following command
```$xslt
make build
```

##### 4. Visit http://localhost:8080
You should see a login screen. You can sign in using this seeded user credentials:
```$xslt
email: john.doe@example.fake
password: password
```
##### 5. Enjoy 🎉
Hopefully your app is up & running now. If you have any trouble building / running the app you can open an issue to this repository or contact me to the email I left at the beginning of this documentation.

---

<a id="implementation"></a>
## Implementation
For more information about the implementation of this app and how to work with it you can check the following docs:
- [Backend](api/README.md)
- [Frontend](website/README.md)

Note that things like, how to add a new route, or how to create a new endpoint are not documented here as the official documentation of the technologies used here are already great.

---
<a id="tests"></a>
## How to run the tests
You can run the tests with following command
```$xslt
make test
```
---
Made with ❤️ by Maximiliano Monge
