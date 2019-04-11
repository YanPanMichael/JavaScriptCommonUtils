const countDown = (value, fn) => {
  fn(value);
  value > 0 ? countDown(value -1, fn) : value;
}

countDown(10, console.log);
countDown(10, input => console.log(input));