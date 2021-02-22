const http = require('http');
const loopReadDir = require('./module/readDir');
http.createServer(function (request, response) {
  loopReadDir(
    (target) => {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end('Hello World '+target)
    });
}).listen(8083);
console.log('Server running at http://127.0.0.1:8083/');

// async await 实现
// const a = async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('hao');
//     }, 1000);
//   })
// };
// // a().then((data) => {
// //   console.log('res', data);
// // });
// const b = async () => {
//   const data = await a();
//   console.log('ress', data);
// }
// b();

// 递归实现原理
// (function a(i) {
//   if (i === 10) {
//     return;
//   }
//   setTimeout(() => {
//     console.log(i);
//     a(i+1);
//   }, 1000);
// })(0)