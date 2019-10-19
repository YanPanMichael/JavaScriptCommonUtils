var arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

//reduce and concat
var arr = [1, 2, [3, 4]];
arr.flat();
//is equals to
arr.reduce((acc, val) => {
  return acc.concat(val);
}, []);
//or with decomposition syntax
const flatted = arr => [].concat(...arr);

//reduce + concat + isSrray + recursivity
var arr = [1, 2, [3, 4, [5, 6]]];
function flatdeep(arr) {
  return arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flatdeep(cur) : cur),
    []
  );
}
flatdeep(arr);

//non recursive flatten deep using a stack
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  //reverse to restore input order
  return res.reverse();
}

var arr = [1, 2, [3, 4, [5, 6]]];
flatten(arr);
// [1, 2, 3, 4, 5, 6]

//User Generator function 
function* flatten(array) {
  for (const item of array) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}

var arr = [1, 2, [3, 4, [5, 6]]];
const flattened = [...flatten(arr)];
// [1, 2, 3, 4, 5, 6]