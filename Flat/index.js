var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

//reduce and concat
var arr = [1,2,[3,4]]
arr.flat();
//is equals to
arr.reduce((acc, val) => {
  return acc.concat(val)
}, [])
//or with decomposition syntax
const flatted = arr => [].concat(...arr)