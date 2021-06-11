Object.create() 介绍
Object.create(null) 创建的对象是一个空对象，在该对象上没有继承 Object.prototype 原型链上的属性或者方法,例如：toString(), hasOwnProperty()等方法

Object.create()方法接受两个参数:Object.create(obj,propertiesObject) ;

obj:一个对象，应该是新创建的对象的原型。

propertiesObject：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。
  ```javascript
var o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { 
    writable:true,
    configurable:true,
    value: "hello" 
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});
console.log(o);//{foo:'hello'}
var test1 = Object.create(null) ;console.log(test1);// {} No Properties 
  ```
因为在bar中设置了configurable 使用set,get方法默认都是不起作用，所以bar值无法赋值或者获取这里的o对象继承了 Object.prototype  Object上的原型方法
我们可以 对象的 __proto__属性，来获取对象原型链上的方法 如：
console.log(o.__proto__);//{__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}console.log(test1.__proto__);//undefined

通过打印发现，将{}点开，显示的是 No Properties ，也就是在对象本身不存在属性跟方法，原型链上也不存在属性和方法，

  ```javascript
new object()

var test1 = {x:1};

var test2 = new Object(test1);

var test3 = Object.create(test1);
console.log(test3);//{} 
//test3等价于test5
var test4 = function(){
　　
}
test4.prototype = test1;
var test5 = new test4();
console.log(test5);
console.log(test5.__proto__ === test3.__proto__);//true
console.log(test2);//{x:1}

{}

var test1 = {};
var test2 = new Object();
var test3 = Object.create(Object.prototype);
var test4 = Object.create(null);//console.log(test4.__proto__)=>undefined 没有继承原型属性和方法
console.log(test1.__proto__ === test2.__proto__);//true
console.log(test1.__proto__ === test3.__proto__);//true
console.log(test2.__proto__ === test3.__proto__);//true
console.log(test1.__proto__ === test4.__proto__);//false
console.log(test2.__proto__ === test4.__proto__);//false
console.log(test3.__proto__ === test4.__proto__);//false
  ```

总结：使用Object.create()是将对象继承到proto属性上
  ```javascript
var test = Object.create({x:123,y:345});
console.log(test);//{}
console.log(test.x);//123
console.log(test.__proto__.x);//3
console.log(test.__proto__.x === test.x);//true

var test1 = new Object({x:123,y:345});
console.log(test1);//{x:123,y:345}
console.log(test1.x);//123
console.log(test1.__proto__.x);//undefined
console.log(test1.__proto__.x === test1.x);//false

var test2 = {x:123,y:345};
console.log(test2);//{x:123,y:345};
console.log(test2.x);//123
console.log(test2.__proto__.x);//undefined
console.log(test2.__proto__.x === test2.x);//false
  ```