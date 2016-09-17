---
redirect_from: "/2016/07/02/hoisting-in-javascript.html"
layout: post
title:  "Hoisting in JavaScript"
date:   2016-07-02 00:20:00 +0100
---

Hoisting is a behavior in JavaScript where variable declarations are moved to the top of the scope it is declared in. That is, the top of the current function or the top of the global scope. This is what allows JavaScript variables to be referenced before they are declared.

This is what happens when a variable is declared:

```javascript
var aVariable = 48;
```

The declaration is moved to the top of the current scope and initialized at the point where it was originally declared.

```javascript
// Top of scope
var aVariable;
...
// Original position declared
aVariable = 48;
```

You can see this when you try to reference a variable that is not defined you get a Reference Error (`ReferenceError`), but when you reference a variable that is later defined, you get `undefined`.

```javascript
console.log(notDefined);
// Logs: Uncaught ReferenceError: notDefined is not defined(…)

console.log(definedLater);
// Logs: undefined

var definedLater = 70;

console.log(definedLater)
// Logs: 70
```

### Hoisting Functions

There are two major ways to create functions in JavaScript: as function declaration and as function expression.

```javascript
// Function Declaration
function sayHi() {
  alert('Hi!');
}

// Function Expression
var sayHello = function () {
  alert('Hello!');
};
```

They are similar and you can call them exactly the same way. The difference lies in when you are able to do so. Function declaration can be called before and after it is defined but Function expression can only be called after it is defined. This is also due to Hoisting.

Just like declaring a variable, Function expressions are hoisted at the top of the current scope and are not initialized until the point where they were originally declared. This is where Function declaration differs.

The whole of Function declaration is hoisted at the top of the scope, allowing the function to be used at anytime.


**Function Declaration**

```javascript
sayHi();

function sayHi() {
  alert('Hi!');
}
// Displays alert box with message "Hi!"
```

**Function Expression**

```javascript
sayHello();

var sayHello = function () {
  alert('Hello!');
};
// Uncaught TypeError: sayHello is not a function(…)
```

### ES6 Note
In ES6 (ECMAScript 2015), declaring a variable with `let` or `const` will hoist the variable at the to of the scope. However, trying to use the variable before it is declared gives a `ReferenceError`.

### Conclusion
As we can see, Hoisting is a deliberate feature in JavaScript, and there are cases where it can be useful, but most of the time, it is best to declare variables before trying to use them.
