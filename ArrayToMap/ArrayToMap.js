const ArrayToMap = arrayList => {
  return arrayList.reduce((obj, item) => {
    obj[item] = [];
    return obj;
  }, {});
};

console.log(ArrayToMap(["a", "b", "c", "d"]));
