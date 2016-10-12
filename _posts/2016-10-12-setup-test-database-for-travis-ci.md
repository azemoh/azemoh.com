---
layout: post
title:  "Setup Test Database for TravisCI"
date:   2016-10-12 19:00:00 +0100
tags: testing
---

Most of the time, we need a database to test our applications. This can be tricky to setup in a Continuous Integration test environment, but [Travis CI](https://travis-ci.org) makes it pretty easy.

Normally you would need to create a database on another online service then set the database URL as an environment variable on your CI service. With Travis, you just need to specify the database as a service in your Travis configuration file _(.travis.yml)_. By doing so, Travis creates a database for you and sets the database URL as an environment variable automatically.

Travis provides support for a number of popular databases but I am going to show how to set this up for MongoDB. To provide some context, this configuration is for a Node.js app that uses a MongoDB database.


#### .travis.yml file
```yml
language: node_js

node_js:
  - node
  - 5

# database service
services:
  - MongoDB
```

For setting up more databases and other configuration settings, check out the Travis CI [Setting up Databases](https://docs.travis-ci.com/user/database-setup/) docs.
