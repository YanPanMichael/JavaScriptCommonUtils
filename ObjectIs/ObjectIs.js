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
