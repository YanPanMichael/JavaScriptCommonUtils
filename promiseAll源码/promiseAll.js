Promise.prototype.myAll = function(promiseList){
  return new Promise((resolve,rejected)=>{
      let result = [],
          count = 0;
      for(let i=0;i<promiseList.length;i++){
          promiseList[i].then(data=>{
              result[i] = data;
              count++;
              if(count === promiseList.length){
                  resolve(result);
              }
          }, (err) => rejected(err))
      }
  })
}

myAll2 = function(promiseList){
  return new Promise(async (resolve, rejected) => {
    let result = [];
    for(let fn in promiseList) {
      const data = await fn().catch((err) => rejected(err));
      result.push(data);
    }
    console.log('result111', result);
    resolve(result);
  });
}

function fetch1(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x)
    }, 5000 * x)
  })
}

let arr = [3, 2, 1]
var test = arr.map(ele => fetch(ele));
myAll2(test).then((list) => {
  console.log('res', list)
})