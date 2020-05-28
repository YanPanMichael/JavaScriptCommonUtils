// Swap key with value JSON

// {A : 1, B : 2, C : 3, D : 4}

// {1 : A, 2 : B, 3 : C, 4 : D}

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = key;
  }
  return ret;
}

// ES6 versions:

function objectFlip(obj) {
  const ret = {};
  Object.keys(obj).forEach(key => {
    ret[obj[key]] = key;
  });
  return ret;
}

function objectFlip2(obj) {
  return Object.keys(obj).reduce((ret, key) => {
    ret[obj[key]] = key;
    return ret;
  }, {});
}

function objectFlip3(obj) {
  return Object.entries(obj).reduce((ret, entry) => {
    const [ key, value ] = entry;
    ret[ value ] = key;
    return ret;
  }, {});
}