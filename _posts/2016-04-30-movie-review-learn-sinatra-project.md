---
layout: post
title:  "Movie Reviewer: Learn-Verified Sinatra Project"
date:   2016-04-30 15:00:00 +0100
---

This post is about "Movie Reviewer" a Web application I built for my [Learn-Verified](https://learn.co){:target="_blank"} Sinatra assessment project. As the name implies, it is an application for Movie reviews where users can submit movies and write reviews about other movies. This is my first full-fledge application using the Sinatra web framework and I want to write about the process and a little bit about Sinatra. You can watch a [demo](#demo) of the app and see the code on [Github](http://github.com/azemoh/movie-review){:target="_blank"}.

### Sinatra

Sinatra a is light-weight and unopinionated web framework written in Ruby, that allows quick building of web applications. It provides a great balance between simplicity and functionality for the developer. With a few lines of code as you see below, you can define routes and controller actions.

```ruby
require 'sinatra'

get '/' do
  "Hello world"
end
```

Sinatra routes matches HTTP methods (get, post etc.) with a given URL pattern to render appropriate views or HTTP response. Read more about Sinatra on their intro [page](http://www.sinatrarb.com/intro.html){:target="_blank"}.


### Project Setup

Sinatra let you structure your app however you want as long as you configure the app and reference files and directories appropriately. After a little tinkering I settled for a Rails-like folder structure.

```
app/
 |_ controllers/
 |_ models/
 |_ views/
db/
 |_ migrate/
 |_ schema.rb
public/
spec/
config.ru
Gemfile
```

### Models and Associations

A Movie Review domain requires three basic models: a User, the Movie and Reviews. This project make use of Active Record, a great ORM (Object Relation Mapper) for mapping Ruby objects to database tables and building their relationships. Declaring model associations with Active Record is easy and intuitive.

- A user `has_many` movies
- A user `has_many` reviews
- A movie `belongs_to` a user
- A movie `has_many` reviews
- A review `belongs_to` a movie
- A review `belongs_to` a user

### Testing

The [Learn-Verified](https://learn.co){:target="_blank"} program is heavily test-driving, and this has taught me the importance of testing and how to write tests. Testing helps you detect bugs early and well written test help you write better and extensible code. I used Rspec to for unit testing the models and Capybara for integration tests of the controllers and views.

![Testing]({{'/assets/img/posts/movie-review-testing.png' | prepend: sute.baseurl }}){:class="center-block"}

### Views and static files

For this project ERB is used for view templating, other options include Haml and Jade. First you need to tell Sinatra where to look for your views.

```ruby
configure do
  set :views, 'app/views'
  ...
end
```

And for static JavaScript and CSS files you need to configure a public folder.

```ruby
configure do
  ...
  set :public_folder, 'public'
end
```

Any file placed in the `public` folder is then served to the browser upon request. I used the [Foundation](http://foundation.zurb.com/sites.html){:target="_blank"} CSS library to give the views some basic styling, because I am fairly comfortable using the Bootstrap library I decided to try out Foundation with this project.

### Conclusion

I found Sinatra to be very flexible and it provided just the minimum tools to build a simple application from scratch. It is a balance between a bare-bones framework like Rack and a robust framework like Ruby on Rails.


### Demo

<div id="demo" class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/K1xCfdfBqNw" frameborder="0" allowfullscreen></iframe>
</div>
