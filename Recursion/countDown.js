const countDown = (value, fn) => {
  fn(value);
  value > 0 ? countDown(value -1, fn) : value;
}

// countDown(10, console.log);
// countDown(10, input => console.log(input));

let timeoutRef = null;
const countDownDelay = (value, fn, delay) => {
  fn(value);
  if(timeoutRef) {
    clearTimeout(timeoutRef);
    timeoutRef = null;
  };
  if(value > 0) {
    timeoutRef = setTimeout(() => countDownDelay(value-1, fn, delay), delay);
  }
}

countDownDelay(10, console.log, 1000);