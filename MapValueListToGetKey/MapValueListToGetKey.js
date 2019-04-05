const data = {
  FRIST: {types: ['a']},
  SECOND: {types: ['b','c','d']},
  THRID: {types: ['e','f']}
}

const getKeyFromTypesList = (sourceObj, prop, targetValue) => {
  return Object.keys(sourceObj).find(
    key => sourceObj[key][prop].indexOf(targetValue) !== -1
  )
}

const res = getKeyFromTypesList(data, 'types', 'd');
console.log(res);
