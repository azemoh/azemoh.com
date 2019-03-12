---
layout: post
title:  Metaprogramming in Ruby
date: 2017-01-02 04:30:00 +0100
tags:
  - ruby
  - metaprogramming
---

Ruby is a very expressive and dynamic language with lots of features that makes it a joy to work with. A lot of this is achieved by its great use of the [Metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming) concept. From its concise and highly readable syntax to a lot of syntactic sugar which almost feels like magic.

In an effort to better understand the inner workings of the language, I am going to write a series of articles on Metaprogramming in Ruby, highlighting common patterns, techniques and use cases and also how they are adopted by some popular Ruby frameworks and libraries.

### What is Metaprogramming? 
Metaprogramming is simply “writing code that writes code at runtime”. This means writing programs that are able to modify themselves by generating executable program code during execution.

This gives us the ability to write programs that are dynamic and are able to handle situations that are not predefined with greater flexibility. Metaprogramming also allows us write code that is DRY, modular and reusable.

Using this concept, we can define classes or methods at runtime, dynamically call methods that are not known beforehand, create polymorphic methods that accept multiple argument types, transform string literals to executable code, create DSLs (Domain-specific Languages) and so on.

### Conclusion

In the first article of this series, we are going to explore the magic of the **“send”** method. We will identify some common patterns where it can be applied and show some code examples. We will also look at how it is used by popular **ActiveRecord** ORM to achieve one of its most powerful features. Watch out for that and thanks for reading.

### Resources

- [Metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming)
- [Polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))
- [ActiveRecord](https://rubygems.org/gems/activerecord)
- [Domain-specific Languages](https://en.wikipedia.org/wiki/Domain-specific_language)
