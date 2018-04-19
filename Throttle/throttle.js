// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : (Date.now || function(){ return new Date().getTime(); } )();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = (Date.now || function(){ return new Date().getTime(); } )();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  /// creating a function to pass in the throteling function 
var theApiCall = function () {
    console.log("i am a custome function that is passed as paramete");
}

/// limiting the api call thrice a second
var resultFunction = throttle(theApiCall, 3 * 1000);

/// Example One:
//calling the closure funciton in every 100 miliseconds
var intervalflag = setInterval(function () {
    resultFunction();
}, 1000);

//clearInterval(intervalflag)

// Example Two:
//resize window
window.addEventListener('resize', throttle(function() {
    console.log('resize!!');
}, 2 * 1000));