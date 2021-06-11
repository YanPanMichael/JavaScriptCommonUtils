最近在学习nodejs，这篇文章就权当是一篇笔记，如果有什么地方有误，望指出。

先说说它们之间的区别：

exports只能使用语法来向外暴露内部变量：如http://exports.xxx = xxx;
module.exports既可以通过语法，也可以直接赋值一个对象。
我们要明白一点，exports和module.exports其实是一个东西，不信我们来输出一下

console.log(module.exports === exports);

//输出结果为：true
输出结果是true其实就说明它们就是一个东西，其实exports = module.exports，因为他们是引用类型的一个变量名，所以当exports再指向一个引用类型的时候，那么他们就不再全等。

exports = [0, 1];
console.log(exports === module.exports);

//输出结果为：false
当然，如果直接通过http://exports.xxx的形式赋值，那么他们依然会指向同一个地址：

exports.array = [0, 1];
console.log(exports === module.exports);

//输出结果为：true
这个时候要明白module.exports和exports的区别，就要清楚什么是值类型，什么是引用类型。我对值类型和引用类型的理解就是，看它是存储在栈上，还是存储在堆上，值类型就是存储在栈上，引用类型是存储在堆上，但是有个很特殊的情况是，引用类型的名字，是存储在栈上，然后这个名字指向了堆上的一个地址，从而可以直接使用变量名，调用堆上的数据。

首先我们要明白一个前提，CommonJS模块规范和ES6模块规范完全是两种不同的概念。

CommonJS模块规范
Node应用由模块组成，采用CommonJS模块规范。

根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;

上面代码通过module.exports输出变量x和函数addX。

require方法用于加载模块。

var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6

exports 与 module.exports
优先使用 module.exports

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

var exports = module.exports;

于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。

注意，因为 Node 模块是通过 module.exports 导出的，如果直接将exports变量指向一个值，就切断了exports与module.exports的联系，导致意外发生：

// a.js
exports = function a() {};

// b.js
const a = require('./a.js') // a 是一个空对象
参考the-difference-between-module-exports-and-exports

ES6模块规范
不同于CommonJS，ES6使用 export 和 import 来导出、导入模块。

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

export default 命令
使用export default命令，为模块指定默认输出。

// export-default.js
export default function () {
  console.log('foo');
}
