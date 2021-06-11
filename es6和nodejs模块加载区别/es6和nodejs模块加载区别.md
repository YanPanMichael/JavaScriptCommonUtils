一.区别
| 语法 | 支持静态编译	| 同步加载 | 值拷贝 | 
| :--- | :--- | :----: | :----: |
| es6模块 |	是（在编译时就完成模块加载）|	否（异步）|	否（导出值和导入值都指向同一块内存，存在动态更新）;例如：export var foo = 'bar'; setTimeout(() => foo = 'baz', 500);在另一个文件引用的foo500毫秒后会发生变化 |
| node（采用common.js规范）|	否（支持动态导入require(${path}/xx.js)））|	是|	是，比如上面的例子，foo到了时间是不会改变，如要改变，重新导入|
二.es6模块使用
//第一种方式需要定义接口名
a.js
//es6的export需要定义对外的接口，属性名m就是接口名
let m=1;
export {m:m}//一般简写成export{m}
export function n(){};//通常情况下，export输出的变量就是本来的名字，输出接口名n

b.js
import {m}from "./a.js"//a.js可以是相对路径，也可以是绝对路径
import {n}from "./a.js"
或者
import * as all from "./a.js"//all是自定义名,all代表了一个对象，可以all.m,all.n这样使用

//第二种方式export default解决import时要知道接口名的问题
a.js
let m=1;
export default m;//注意：a.js只能有一个export default

b.js
import xx from "./a.js"//xx自定义名


三.node.js模块的使用
//第一种方式将对象赋值给 module.exports（这是模块系统提供的对象），这会使文件只导出该对象;
//定义一个输出模块
a.js
const obj={m:1,n:2};
module.exports=obj;
//定义一个输入模块
b.js
const res=require("./a.js");//相对和绝对路径都可以
console.log(res.m);
//第二种方式是将要导出的对象添加为 exports 的属性。这种方式可以导出多个对象、函数或数据：
//定义一个输出模块
a.js
const obj={m:1,n:2};
const fn=function(){};
exports.x=obj;
exports.y=fn;
//定义一个输入模块
b.js
const res=require("./a.js");//相对和绝对路径都可以
console.log(res.x,res.y);

注意：module.exports 和 export 之间有什么区别？

实际上

复制
// module 基本实现
var module = {
  exports: {} // exports 就是个空对象
}
//这表示module.exports` 和 `exports`的关系 ,都是指向同一块内存
var exports = module.exports ;//注意：不能把exports直接指向一个值，这样就相当于切断了 exports 和module.exports 的关系。例如 exports=function(x){console.log(x)}，只能使用exports.属性名=xx;