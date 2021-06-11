

js中的Symbol数据类型
==============

最近，在学习vue的过程中碰到了一种从没有遇到过的数据类型：Symbol  
查阅资料后，发现这是一种在ES6 中新添加的数据类型，好奇之下研究了下。

Symbol 本质上是一种唯一标识符，可用作对象的唯一属性名，这样其他人就不会改写或覆盖你设置的属性值。  
声明方法：

    let id = Symbol("id“);
    

Symbol 数据类型的特点是唯一性，即使是用同一个变量生成的值也不相等。

     let id1 = Symbol('id');
     let id2 = Symbol('id');
     console.log(id1 == id2);  //false
    

Symbol 数据类型的另一特点是隐藏性，for···in，object.keys() 不能访问

     let id = Symbol("id");
     let obj = {
      [id]:'symbol'
     };
     for(let option in obj){
         console.log(obj[option]); //空
     }
    

但是也有能够访问的方法：**Object.getOwnPropertySymbols**  
Object.getOwnPropertySymbols 方法会返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

     let id = Symbol("id");
     let obj = {
      [id]:'symbol'
     };
    let array = Object.getOwnPropertySymbols(obj);
     console.log(array); //[Symbol(id)]
     console.log(obj[array[0]]);  //'symbol'
    

虽然这样保证了Symbol的唯一性，但我们不排除希望能够多次使用同一个symbol值的情况。  
为此，官方提供了全局注册并登记的方法：Symbol.for()

     let name1 = Symbol.for('name'); //检测到未创建后新建
     let name2 = Symbol.for('name'); //检测到已创建后返回
     console.log(name1 === name2); // true
    

通过这种方法就可以通过参数值获取到全局的symbol对象了，反之，能不能通过symbol对象获取到参数值呢？  
是可以的 ，通过Symbol.keyFor()

     let name1 = Symbol.for('name');
     let name2 = Symbol.for('name');
     console.log(Symbol.keyFor(name1));  // 'name'
     console.log(Symbol.keyFor(name2)); // 'name'
    

最后，提醒大家一点，在创建symbol类型数据 时的参数只是作为标识使用，所以 Symbol() 也是可以的。
