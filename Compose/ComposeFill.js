const compose = (...fns) => {
  return fns.reduceRight((prevFn, nextFn) => {
    return (...args) => nextFn(prevFn(...args))
  }, value => value);
}

const example = compose(
  val => {console.log(`0 ${val}`);},
  val => {console.log(`1 ${val}`); return `1${val}`;},
  val => {console.log(`2 ${val}`); return `2${val}`;},
  val => {console.log(`3 ${val}`); return `3${val}`;}
);

example('hello');
