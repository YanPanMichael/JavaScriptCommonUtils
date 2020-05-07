function trimArrayMutipleItemsByReduce(inputArray) {
  inputArray.sort().reduce((a, b) => {
    if (b != a[0]) a.unshift(b);
    return a;
  }, []);
}

function trimArrayMutipleItemsBySet(inputArray) {
  return Array.from(new Set(inputArray));
}

function trimArrayMutipleItems(inputArray) {
  return [...new Set(inputArray)];
}

function trimTwoArrayMutipleItems(inputArray1, inputArray2) {
  return inputArray1.filter((val) => {
    return inputArray2.indexOf(val) != -1;
  });
}

export default {
  trimArrayMutipleItemsByReduce,
  trimArrayMutipleItemsBySet,
  trimArrayMutipleItems,
  trimTwoArrayMutipleItems,
};
