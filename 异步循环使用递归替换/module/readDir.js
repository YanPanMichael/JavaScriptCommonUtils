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
module.exports = loopReadDir;
