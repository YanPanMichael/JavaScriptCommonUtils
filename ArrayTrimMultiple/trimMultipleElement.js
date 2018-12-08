//es5
//建一个空对象和空数组，循环遍历需要去重的数组，判断对象有没有此属性，没有的话就给对象添加此属性，并向空数组中push这个值。
function unique1(arr) {
  var result = [];
  var obj = {};
  for (var i in arr) { // in represents index(key), of represents value
    if (!obj[arr[i]]) {
      obj[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
}

//es6
function unique2(arr) {
  return [...new Set(arr)];
}