---
layout: post
title: 'Metaprogramming: Invoking Methods'
date: 2017-01-31 02:00:00 +0100
tags:
  - ruby
  - metaprogramming
---

Object-oriented programs generally involves objects passing messages back and forth between themselves. This is what happens when methods are invoked i.e when we call a method of function. When methods of objects are called, it can be said that "messages are being sent to that object".

The **send** method in Ruby, is used to invoke methods dynamically. This is useful when the method to be called is not known in advance, and is to be determined at runtime.

**Send** accepts the name of the method to be invoked as it's first argument, either as a string or symbol. If the method require arguments, they are also passed to the send method in the same order with the method name coming first.

In the example below, we have a `Person` class with two methods defined, and are calling these methods using the send method.

```ruby
class Person
  def hello
    "Hello World!"
  end

  def greet(name)
    "Hello #{name}!"
  end
end

tony = Person.new
tony.send(:hello) #=> "Hello World!"

# Method with arguments
tony.send("greet", "Sam") #=> "Hello Sam!"

1.send(:+, 2) #=> 3
```

In the last example, the addition method is being called on the **`1`** object, passing **`2`** as an argument.
Right now, this does not seem so useful because we can just call the `hello()` method directly.

## Common Patterns
**Send** really comes in handy when we have to determine what method to call by some logic. Let us look at some patterns and applications.

### Action/Method Routing

In this pattern the **send** method is used to invoke appropriate methods based on the value of a string variable.

Given the following block of code, we have a bunch of `if/else` statements to determine the appropriate validation method to execute for each attribute of our `Person` class. For each attribute, we want to call it's associated validation method.

**Using if/else**

```ruby
if attribute == "name"
  validate_name
elsif attribute == "age"
  validate_age
elsif attribute == "date_of_birth"
  validate_date_of_birth
end
```

Using the send method, we can use string interpolation to append `"validate_"` to the value of the `attribute` string. This would give use the name of the appropriate validation method.

**Using Send**

```ruby
send("validate_#{attribute}")
```

And there you go, we are able to call the appropriate method without multiple `if/else` statements. This also eliminates the need to add more `elsif` conditions as more attributes are added to the class.

### Mass Assignment

Mass assignment is a pattern where properties of an object are passed to it's constructor as a single hash. These properties are then assigned to the appropriate instance attribute in a single go.

**Send** is used in this pattern to dynamically assign values to object properties.

**Single property assignment**

```ruby
sam = Person.new
sam.name = "Sam"
sam.age = 32
sam.date_of_birth = "1985-05-02"
```

**With Mass assignment**

```ruby
class Person
  attr_accessor :name, :age, :date_of_birth
  def initialize(attributes={})
    attributes.each do |attribute, value|
      send("#{attribute}=", value)
    end
  end
end

attributes = { name: "Sam", age: 32, date_of_birth: "1985-05-02" }
sam = Person.new(attributes)

sam.send(:name) #=> "Sam"
```

In this example, The constructor receives its attributes as a single hash, then iterate over each attribute, using the **send** method to call the corresponding setter method with it's associated value.

This pattern is adopted by ActiveRecord ORM and Rails to pass model attributes gotten from request body parameters, to models as a single hash. ActiveRecord uses `public_send` which is used to invoke public methods.


## Conclusion

We have seen how methods not known until the point of code execution can be invoked using the **send** method, and how this can be applied to write truly dynamic programs. Next in this series, we will look at how to define methods dynamically at runtime.

I would love to get comments and suggestions about more ways this metaprogramming technique can be used, please post comments, questions and suggestions below. Thank you!

**Teaser:** given the methods defined above, what is the output of the following 😉?

```ruby
tony.send(:send, :hello)
```

### Resources

- [Send - Ruby Doc](http://ruby-doc.org/core-2.4.0/Object.html#method-i-send){:target="_blank"}
- [String Interpolation](https://en.wikipedia.org/wiki/String_interpolation){:target="_blank"}
- [ActiveRecord - Mass assignment source code](https://github.com/rails/rails/blob/master/activemodel/lib/active_model/attribute_assignment.rb#L38){:target="_blank"}
