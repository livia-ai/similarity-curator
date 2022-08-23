# LiviaAI Server

The server consists of three components.

1. A vector search engine for nearest neighbour queries in the image embeddings we computed
2. A fulltext search engine to search in the image metadata
3. A small(-ish) database to store "exhibitions" (and assign them URLs for sharing)

We'll use [Qdrant](https://qdrant.tech/) as a vector search engine. It's available as a Docker image, and the ability to 
index keyword payload (record URL, museum tag, etc.) is convenient.

ElasticSearch for fulltext indexing.

For the exhibitions, we'll probably use RethinkDB. It's easy to setup in Docker, and schema-less/JSON-capable. Probably overkill
for what we are doing. But handles concurrency well and convenient to use.