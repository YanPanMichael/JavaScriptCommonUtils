// 在前端的数据处理当中,有时候往往需要对原有的数据进行克隆拷贝一份,然后在进行操作,但是又不能影响原来的数据

// 比较典型的应用场景就是:点击一信息列表,然后编辑该列的信息。在弹出的编辑弹出框中,需要复制原有的列表信息内容,如果是浅拷贝的话,那么改变现有的数据,会影响原来的数据,这样显然是不符合需求的

// 在真实的业务场景中,对数据进行深拷贝是一个非常常见的操作

// 你将在本文中学习到

//  基本(简单)数据类型赋值与复杂数据类型赋止的区别

// 浅拷贝与深拷贝它们的区别以及实现方式

// 往一个数组中push对象，前面的值总是会被最后一次的值覆盖的问题



// ·  正  ·  文  ·  来  ·  啦  ·



01

// 基于基本(简单)数据类型的拷贝操作是赋值

// 在js中,数据类型包括两种:基本类型(6种,数字number,字符串string,布尔boolean,null,undefined,Symbol）和引用类型(对象,数组,函数)

// 赋值

// 基本类型的数据拷贝,会重新开辟一个空间存放拷贝的值,它是放置在栈中的,这种我们一般称为赋值 如下所示:

var num =  100;
var str = "itclanCoder";
var bol = true;
var nul = null;
var unde = undefined;
var sym = Symbol;

num1 = num;   // 将num赋值给左边num1
str1 = str;         // 将str赋值给左边的str1
bol1 = bol;       // 将bol赋值给左边的bol1
console.log(num,str,bol,nul,unde,sym,num1,str1,bol1);
num1 = 200;    // 给num1重新赋值
str1 = "川川";
bol1 = false
console.log(num,str,bol,nul,unde,sym,num1,str1,bol1);
num = 300;
str = "web";
bol = false;
console.log(num,str,bol,nul,unde,sym,num1,str1,bol1);
// 显示结果如下所示

// 图片

// 图片

// 而对应的就是复杂类型(数组,对象,函数等)的拷贝,拷贝下来的只是指向存放数据空间的指针 类似这种拷贝数据的行为称为赋止(拷贝的是地止)

var a = [1,2,3,4];  // 定义一个数组
b =  a;
console.log(a)   // [1,2,3,4]
console.log(b);  // [1,2,3,4]
图片

// 当你尝试着改变b[0]=100时,此时a数组也发生改变了的,这就是浅拷贝了的 因为它们指向的都是同一个地止，所以当地止中的数据发生改变,指向该存放的地止的所有变量都会发生改变

02

// 浅拷贝

// 定义: 对一个对象进行拷贝时，仅仅拷贝对象的引用进行拷贝，但是拷贝对象和源对象还是引用同一份实体

// 其中一个对象的改变都会影响到另一个对象

// 简单点:假设B复制了A对象,改变其中的任何一个对象,都会影响到另一个对象,那么这就是浅拷贝,如果互相不影响,那么就是深拷贝

03

// 深拷贝

// 主要是针对复杂的数据类型

// 定义:指拷贝一个对象时，不仅仅把对象的引用进行复制，还把该对象引用的值也一起拷贝

// 简单点:源对象与拷贝对象互相独立，其中任何一个对象的改动都不会对另外一个对象造成影响,其实就是打破隔离对象引用之间的关系

// 那么用代码具体怎么操作实现呢? 先来看一个问题:

var obj1 =  { x:1, y:2 }
var obj2 =  obj1;
obj2.x = 100;
console.log(obj1, obj2); // {x:100,y:2} {x:100, y:2}
// 当你改变obj2的值,会影响到obj1的值,显然有时候,这不符合我们的需求,那怎么解决? 

// 第一种解决办法: 通过for-in

var obj1 = {x: 1, y: 2};
var obj2 = {};   // 定义一个空对象
for(var key in obj1) {
      obj2[key] = obj1[key]
}
obj2.x = 100;
console.log(obj1, obj2); // {x:1, y:2} {x:100, y:2}
// 第二种解决办法: 通过object.assign()方法,这种方式在实际开发中很常用

var obj1 = { x: 1, y: 2}
var obj2 = Object.assign({}, obj1);
ob2.x = 100;
console.log(obj1, obj2);
// 第三种解决办法: 通过Es6中的拓展运算符 ...

var obj1 = {x: 1, y: 2}
var obj2 = {...obj1};
obj2.x = 100;
console.log(obj1, obj2);
// 第四种解决办法: 通过JSON.parse(JSON.stringify())

var obj1 = { x: 1, y: 2}
var obj2 = JSON.parse(JSON.stringify(obj1));
ob2.x = 100;
console.log(obj1, obj2);
// 上面四种方法都可以解决,改变obj2对象的值,不会影响到obj1对象的值

// 但是需要格外注意的是:除了第四种深拷贝JSON.parse(JSON.stringify()),其他方式只能做一层拷贝 

// 如果考虑深层的嵌套关系,那么就需要用深拷贝了的,比如类似下面这样的结构

var obj1 = {x: 1, y: 2, z: { a: 3, b: 4}}
var obj2 = {};
for(var key in obj1) {
      obj2[key] = obj1[key]
}
obj2.z.a =  100;
console.log(obj1, obj2);  // 这样的话，改变obj2的变量会影响obj1的变量对象
// 那怎么实现深拷贝?:利用的是递归

 /*
  *  * 
  *  @description:把一个对象递归拷贝给另外一个对象
  *  源对象与拷贝后的对象没有引用关系,实现克隆
  *  @params {obj2} obj2为被拷贝的对象
  *  @return {obj} obj为最终拷贝出来的对象
  *  @author itclanCoder
  *  */
function deepCopy(obj2){    // 递归函数
    var obj =  isArray(obj2)?[]:{}; // 判断被拷贝对象是数组还是对象,如果不考虑数组的话,会出现一些问题,如果被拷贝对象里面有数组对象的话,会把数组变为对象,如果传进来是一个数组的话,就让它是一个数组的,是一个对象就是一个对象的
    // 取出obj2的所有属性,如果当前拷贝的数据还是一个对象的话,那么继续调用,deepCopy进行二次拷贝，递归
    for(var property in obj2){
        if(isObject(obj2[property])){
            obj[property] = deepCopy(obj2[property])  // 递归
        }else{
            obj[property] =  obj2[property]
        }
    }
    return obj;
}

// 判断一个值是不是数组
function isArray(val){
    return Object.prototype.toString.call(val) === '[object Array]';
    // 这里直接用Es6中的Array.isArray()方法判断是不是数组也是可以的,但是上面那种是一些标准库的常见用法
}
// 判断是不是对象
function isObject(val){
    return typeof val === 'object' && val !== null;
}
var obj1 = {x: 1, y: 2, z: { a:3, b: 4}}
var obj2 = deepCopy(obj1);
obj2.x = 100；
obj2.z.a = 200;
console.log(obj1, obj2);

04

// 往一个数组中push对象，前面的值总是会被最后一次的值覆盖

// 背景:在实际开发中,你也许会遇到这样的需求,需要往一个数组中添加对象,但结果是最后一次push的对象值总会覆盖之前push进去的值，例如如下所示:

var sourceObj = { name: "川川", age: 20, job: "搬砖"}
var targetObj = {};  // 在外头定义对象
var arrs = [];   // 定义一个空数组,保存新添加入的值,需要将obj中的对象添加到这个arrs数组当中去
for(var i in sourceObj ) {
  targetObj.name = sourceObj[i];
  arrs.push(targetObj);
}
console.log(arrs);  //  [{name: "搬砖"}, {name: "搬砖", {name: "搬砖"}}]
// 结果令人意外,却是

 [{name: "搬砖"}, {name: "搬砖", {name: "搬砖"}}]
// 而非

 [{name: "川川"}, {name: "age", {name: "搬砖"}}]
// 这在初学者的中,是一件非常令人苦恼的事情,甚至让你掉不少头发 

// 目标结果:分别拿到 sourceObj对象中的键值对,然后存储到目标数数组arrs中,也就是arrs最终结果应该是这样的

arrs = [{name: "川川"}, {age: 20}, {job: "搬砖"}]

// 问题原因: 每次取出来的值都放在 targetObj.name中了，因为是在外面的定义的对象，所以每次 targetObj的地址是一样的, arrs中保存的是 targetObj的地址，当最后一次给targetObj.name赋值为 搬砖时

// 由于是同一个 targetObj,所以最后一次给 targetObj.name赋值时,会将前面两次的值给覆盖掉，其实第二次已经把第一次的值覆盖过了

// 具体解决:把定义在外面的目标对象 targetObj放到 for-in里面就可以了的

var sourceObj = { name: "川川", age: 20, job: "搬砖"}
var arrs = [];   // 定义一个空数组,保存新添加入的值,需要将obj中的对象添加到这个arrs数组当中去
for(var i in sourceObj ) {
    var targetObj = {};  // 在里面定义对象
    targetObj.name = sourceObj[i];
    arrs.push(targetObj);
}
console.log(arrs);  //  [{name: "川川"}, {name: 20, {name: "搬砖"}}]
// 其中在for-in中前面的 i代表的就是 key值,所以:如果想要把 sourceObj对象中的键值一并放到 arrs数组中,你可以这样做:将目标对象赋值时, targetObjet.name换成 targetObject[i]就可以了的

var sourceObj = { name: "川川", age: 20, job: "搬砖"}
var arrs = [];   // 定义一个空数组,保存新添加入的值,需要将obj中的对象添加到这个arrs数组当中去
for(var i in sourceObj ) {
    var targetObj = {};  // 在里面定义对象
    targetObj[i] = sourceObj[i];
    arrs.push(targetObj);
}
console.log(arrs);  //  [{name: "川川"}, {age: 20}, {job: "搬砖"}]
// 曾今,这被作为一个面试题,尽管很基础,但我发现,能快速回答以及正确做出来的,还真不多,虽然也谈不上奇葩,一下子没想出来,也并不能代表什么,但是不得不说,最基础的东西,才是最值得回味的

// 结语

// 本篇主要介绍了JS中的浅拷贝与深拷贝,其中深拷贝,主要是针对复杂的数据类型而言的,也就是,数组,对象,函数等

// 对于基本数据类型的拷贝称作为赋值,而复杂数据类型的拷贝为赋止,不用深究概念,改变一个对象,影响了另一个对象,那这就是浅拷贝,要是不影响,那就是深拷贝

// 而实现数据的拷贝有四种方式,for-in,以及Object.assign(),拓展运算符...,还有JSON.parse(JSON.stringify())

// 其中前面三者只能实现数据的一级拷贝,如果想要更深沉次的拷贝的话,那么可以用递归实现,如上面代码所示

// 当然最后也提到了一个开发中常见的问题:往一个数组中push对象，前面的值总是会被最后一次的值覆盖的问题,具体解决办法是,把目标对象放在for-in里面就可以了的

function deep_copy(a) {
    const targ = Array.prototype.slice.call(a, 0);
    const targ2 = Array.prototype.concat.call(a, []);
    const targ3 = JSON.parse(JSON.stringify(a));
    const targ4 = Object.prototype.assign({}, a);
    const targ5 = [...a];
    const targ6 = Array.from(a);
    const targList = [];
    for(let b in a) {
        targList.push(b);
    }
}

// 深度优先遍历
function dfs(node) {
    const res = [];
    if(node) {
        const stack = [];
        stack.push(node);
        while(stack.length) {
            const curr = stack.pop();
            res.push(curr);
            for(let child of curr.children) {
                stack.push(child)
            }
        }
    }
    return res;
}

// conpose()(arg)
function compose(...args) {
    if(args.length === 0) {
        return v => v;
      }
      if(args.length === 1) {
        return args[0];
      }
    return args.reduce((sum, cur) => (...input) => sum(cur(...input)), val => val);
}
var a = [(v)=>console.log('1',v), (g)=>console.log('2',g)]
compose(...a)();

function compose(middleWare) {
    return async function(...args) {
        async function dispatch(i) {
            const fn = middleWare[i];
            if(!fn) return null
            await fn(function next() {
                dispatch(i + 1);
            }, ...args)
        }
        await dispatch(0);
    }
}

function compose_simple(middleware) {
    return async function(...args) {
        await dispatch(0)
        async function dispatch(i) {
            const fn = middleware[i]
            if(!fn) return null
            await fn(function next() {
                dispatch(i+1)
            }, ...args)
        }
    }
}

function test(id) {
    const node = document.getElementById(id);
    Object.defineProperty(node, 'value', {
        configurable: true,
        get: function() {
            return this.__name__;
        },
        set: function(value) {
            this.__name__ = value;
            console.log('name: ', this.__name__)
        }
    })
}

const handler = {
    set: function(target, name, value) {
        console.log('phone发生了变化');
        // 改变被代理对象的值,使之保持一致
        target[name] = value;
    }
}

const proxy = new Proxy(node, handler)
proxy.name = '';
