const { stat, readdir } = require("fs");

let target = [];
const path = './static'
function loopReadDir(callback) {
  readdir(path, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    (function getDir(i){
      if(i === data.length) {
        console.log('target', target);
        return callback(target);
      }
      stat(path + '/' + data[i], (error, stats) => {
        if(error) {
          console.log(err);
          return;
        }
        if (stats.isDirectory()) {
          target.push(data[i]);
        }
        getDir(i+1);
      })
    })(0);
  });
}

const statFunc = (currPath) => {
  return new Promise((resolve, reject) => {
    stat(currPath, (error, stats) => {
      if(error) {
        reject(false)
      }
      if (stats.isDirectory()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

const loopReadDirByPromise = () => {
  const path = '../static'
  readdir(path, async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      if(await statFunc(path + '/' + data[i])) {
        target.push(data[i]);
      }
    }
    console.log('res: ', target);
  })
};

loopReadDirByPromise();

module.exports = loopReadDir;
