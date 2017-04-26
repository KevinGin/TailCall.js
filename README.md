# TailCall.js
Tail Call Optimization for JavaScript. Optimized functions will never exceed maximum stack size.

---

JavaScript engines are not (yet) optimized for tail recursion. A new stack is always created for a recursive call, regardless of whether the call is made in the tail position.

Consider a function that recursively adds the positive integers between 0 and n:

```javascript
function sumTo(n, results = 0) {
  if (n <= 0) {
    return results;
  } else {
    return sumTo(n-1, results + n);
  }
};
sumTo(4) // returns => 10
sumTo(13000)  //  (!) RangeError: Maximum call stack size exceeded
```

The tailCall function allows the function to run indefinietley, never exceeding the maximum stack size:

```javascript
function sumTo(n, results = 0) {
  if (n <= 0) {
    return results;
  } else {
    return tailCall(n-1, results + n);     //replaced "sumTo" with "tailCall"
  }
};
sumTo(4) // returns => 10
sumTo(13000)  //  returns => 84506500
sumTo(10000000)  // returns => 50000005000000
```

The higher-order function:

```javascript
function tailCall(...args) {
  var copy = tailCall;
  var recurse = true;
  var result = args;
  var caller = tailCall.caller;

  tailCall = (...args) => {
    result = args;
    recurse = true;
  }

  while (recurse) {
    recurse = false;
    caller.apply(null,result)
  }

  tailCall = copy;

  return caller.apply(null,result);
}
```