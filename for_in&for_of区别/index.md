比较下for..of 与 for..in 的区别
请写出如下代码的结果

var arr = ['a', 'b', 'c'];
Array.prototype.hello = 'd';
for(item of arr) {
  console.log(item);
}

for(item in arr) {
  console.log(item);
}
答案: 输出 a,b,c, 0,1,2,hello

共同点: 都会遍历数组的属性

不同点: of 前面的item遍历的是数组arr的项,而in前面的item代表的事数组arr的属性,索引,属性,in 会遍历原型下的属性,不仅仅会遍历自身属性,还会遍历所有继承通过原型链的对象下的属性

for..of:可用于遍历数组,不能遍历对象

因此,如果这不是预期的结果,必须要在循环内使用简单的 if 语句,以便确保我们只访问特定对象的本地属性

访问属性的顺序并不总是他们在循环内部被定义的顺序,另外,定义属性的顺序不一定是访问他们的顺序

使用for..in循环只能遍历可枚举的属性,即在遍历对象时可用的属性,如构造函数属性就不会显示,可以使用propertyIsEnumerable()方法检查哪些属性是可枚举属性

可以使用hasOwnProperty验证对象属性是不是来自原型链

for(var item in arr) {
  //避免来自原型链
  if(arr.hasOwnProperty(item)) {
    console.log(item)
  }
}