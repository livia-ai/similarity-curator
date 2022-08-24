# LiviaAI Exploratory Browser

An experimental web application to browse connections between artworks, identified through AI in the LiviaAI project.

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