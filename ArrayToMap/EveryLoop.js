let findflag = false;

const findInTwoArray = (Obj, target) => {
  Object.keys(Obj).every((item1, index) => {
    console.log('loop1-', index);
    Obj[item1].every((item2, jndex) => {
      if (item2 === target) {
        findflag = true;
        return false;
      }
      console.log('loop2+', jndex);
      return true;
    });
    return !findflag;
  })
};

const testObj = {a: [1,2,3], b: [4,5], c: [6], d: []};

findInTwoArray(testObj, 6);
console.log(findflag);