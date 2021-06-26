
function findSecondMax(list) {
  if(!Array.isArray(list)) throw new Error('type error');
  if (list.length < 2) return NaN;
  let max = list[0], sec = list[1];
  for(let i=0; i<list.length; i++) {
    if(list[i] > max) {
      sec = max;
      max = list[i];
    } else if (list[i] < max && list[i] > sec) {
      sec = list[i];
    }
  }
}

function findArrayThree(list) {
  if() {
    
  }
}

