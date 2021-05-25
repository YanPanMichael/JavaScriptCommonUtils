const a = [1,5,6,-2,7,9,-1];
const target = 8;

function findIndex(list, target) {
  const map = new Map();
  if(!Array.isArray(list) || typeof target !== 'number') return new Error("input error");
  for(let i in list) {
    const complate = target - list[i];
    if(map.has(complate)){
      return [map.get(complate), i];
    } else {
      map.set(list[i], i);
    }
  }
  console.log('resolt: ', map);
  return [];
}

findIndex(a, target);