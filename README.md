# LiviaAI Similarity Curator

![Screenshot](screenshot.jpg)

An experimental web application to browse artworks by similarity, as computed through AI in the LiviaAI project.

## Client

A client web application. Static pages built with [Astro](https://astro.build/) and 
[Tailwind](https://tailwindui.com/), dynamic elements with [Svelte](https://svelte.dev/).

## Server

The server backend for the application. Consists of:

- a vector search engine for nearest-neighbour searches in the image embedding space, built with 
  [Qdrant](https://qdrant.tech/)
- fulltext search in title and description metadata, built with [ElasticSearch](https://www.elastic.co/)
- a [RethinkDB](https://rethinkdb.com/) application database

The API is implemented as a [Fastify](https://www.fastify.io/) application, and sits behind an 
[NGINX](https://www.nginx.com/) reverse proxy. The whole stack is containerized via [Docker](https://www.docker.com/).

## Preparing data

...TODO...

## HTTPS Configuration
<details>
<summary>Cick to expand</summary>

Installation of HTTPS certificates via Certbot and LetsEncrypt is prepared in the Docker setup,
but requires manual steps. The process is based on [this guide](https://mindsers.blog/post/https-using-nginx-certbot-docker/).

#### 1. Test if the setup works correctly

```sh
docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d livia.rainersimon.io
```

#### 2. Test if the setup works correctly

With HTTPS still disabled, download certificate from LetsEncrypt:

```sh
docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d livia.rainersimon.io
```

#### 3. After the certificate is available

- Edit NGINX config file in `nginx/config/default.conf` and uncomment the HTTPS config.
- Restart everything with `docker compose up`
</details>

## Developer Information

You can start the whole application stack via `docker compose up`. For client-development: 

- use `docker compose --file docker-compose.dev.yml up --build`. This will start only the backend, with ports exposed. __Data will be indexed the first time you start. This may take a while.__
- Change into the `/client` folder.
- Run `npm install` and `npm start` to start the client application in dev mode.
