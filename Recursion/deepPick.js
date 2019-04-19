const target = {
  type: 'person',
  data: {
    gender: 'male',
    info: {
      id: 111,
      fullname: {
        first: 'Jim',
        last: 'chen'
      }
    }
  }
}

const deepPick = (url, object={}) => {
  let [curr, ...remain] = url.split('.');
  return remain.length ?
    deepPick(remain.join('.'), object[curr]) :
    object[curr];
}

console.log(deepPick('data.info.fullname.last', target));