function factorial(n) {
    if(n == 0) {
        return 1;
    } else {
        return n * factorial(n-1);
    }
}

var memfactorial = memoize(factorial, {"0":1, "1":1});

var fact5 = memfactorial(5);
var fact6 = memfactorial(6);
console.log(fact5+" ## "+fact6);