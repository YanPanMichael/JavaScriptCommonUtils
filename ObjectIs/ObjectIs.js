// Object.is polyfill

(function() {
  if (!Object.is) {
    Object.is = function(x, y) {
      // SameValue algorithm
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    };
  }
})();

// let a = [];
// let b = Array.from(a);
// console.log(Object.is(a, b));
