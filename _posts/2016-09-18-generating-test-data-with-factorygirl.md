---
layout: post
title:  "Generating Test Data With FactoryGirl"
date:   2016-09-18 15:10:00 +0100
tags: testing TDD
---

While testing Rails applications, you often need sample data to try out features in your app. The general flow is to create some data, perform operations on them, then make assertions about the data or expect some changes in your application.

Rails does this with [Fixtures](http://guides.rubyonrails.org/testing.html#the-low-down-on-fixtures) which can be used to stub-out sample data. But it becomes tedious when there is a need for multiple data that vary slightly, to build model associations or to create models with unique values. This is where [FactoryGirl](https://github.com/thoughtbot/factory_girl) shines. 

Factory Girl provides a nice way to define and create dynamic data using some predefined set of values.

### Getting Started
We will be modeling a music domain. To get started let's define a factory to create data for a song model.

__Defining factories__

```ruby
FactoryGirl.define do
  factory :song do
    title "One Dance"
    artist "Drake"
    genre "Hip-Hop"
    year 2016
  end
end
```

__Use factory to create data__

```ruby
song = FactoryGirl.create(:song)

# Change default title attribute.
controlla = FactoryGirl.create(:song, title: "Controlla")
# Create collection of songs
songs = FactoryGirl.create_list(:songs, 10)
```
<small>
__Pro tip:__ if you just need a song instance and don't need the song to be saved to your test database, use `FactoryGirl.build(:song)` instead.
</small>


#### Building Associations

FactoryGirl also allows you to define model associations pretty easily. To demonstrate this we'll make the artist attribute of our Song factory a factory on it's own, as opposed to just being a string.

```ruby
FactoryGirl.define do
  # Artist Factory
  factory :artist do
    name "Drake"
    label "OVO Sound"
  end

  # Song Factory
  factory :song do
    title "One Dance"
    artist factory: :artist
    genre "Hip-Hop"
    year 2016
  end
end

# Usage
song = FactoryGirl.create(:song)
song.artist.name #=> "Drake"
```

#### Sequence

Sequence is another cool feature of FactoryGirl, that makes it easy to create multiple data with unique values. This is useful when your data model has an attribute that should be unique, like emails, ID numbers etc. We will introduce a track number attribute to our Song factory to show this.

```ruby
# Song Factory
FactoryGirl.define do
  factory :song do
    title "One Dance"
    artist factory: :artist
    genre "Hip-Hop"
    sequence(:track_number) {|n| n } # n += 1 for each new instance. 
    year 2016
  end
end

FactoryGirl.create(:song).track_number #=> 1
FactoryGirl.create(:song).track_number #=> 2

# For emails we might have something like
sequence(:email) { |n| "someone#{n}@mail.com" }
```

#### Traits

FactoryGirl uses "Traits" to give additional attributes to objects.
We can modify our song factory to only assign album and track numbers to songs that are part of an album. That is songs that are not singles.

```ruby
# Song Factory
FactoryGirl.define do
  factory :song do
    title "One Dance"
    artist factory: :artist
    genre "Hip-Hop"
    year 2016

    trait :has_album do
      album "Views"
      sequence(:track_number) {|n| n }
    end 
  end
end

FactoryGirl.create(:song).track_number #=> nil
# use :has_album trait
FactoryGirl.create(:song, :has_album).track_number #=> 1
```

#### Attributes

Finally, there are times when you just need a hash of attributes for a model, which you can use to test POST controller actions. FactoryGirl provides `attributes_for`.

```ruby
song_params = FactoryGirl.attributes_for(:song)
#=> { title: "One Dance", genre: "Hip-Hop", year: 2016 }
song_params = FactoryGirl.attributes_for(:song, :has_album)
#=> { title: "One Dance", genre: "Hip-Hop", year: 2016, album: "Views", track_number: 1 }
```

### Conclusion

FactoryGirl provides a really simple DSL to generate dynamic data for our test. It offers a lot more and this simple introduction should get you started. Check out the official [guide](https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md) to read more.
