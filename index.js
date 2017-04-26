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