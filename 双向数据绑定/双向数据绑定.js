<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Proxy vue 双向绑定</title>
  </head>
 
  <body>
    <div id="app">
      <h3 id="myP"></h3>
      <input type="text" id="myText" />
    </div>
  </body>
</html>
 
<script>
  // 用proxy代理 模拟实现vue双向绑定
  let myText =document.getElementById("myText");
  let myP =document.getElementById("myP");
  let obj = {
      myText : "长路漫漫，唯剑作伴。吾之荣耀，离别已久。",
  };
  //  代理对象
  let proxyObj = new Proxy(obj,{
      get: function(target,propKey){  // target 受理对象 propKey 属性
          return target[propKey];
      } ,
      set: function(target, propKey , value){  //target 受理对象 propKey 属性  value 属性值
          myText.value = value;  // 将文本框新的值赋值覆盖以前的值
          myP.innerText = myText.value; // 将文本框的值 赋值给文本段落
      },
  })
  //  1 .触发set 将文本框显示值
    proxyObj.myText = obj.myText;  
  //  2 .实现双向绑定 文本框里面的值变化 obj对象的值更新 更新其他元素的值
  myText.addEventListener("input", function(e){
        proxyObj.myText= e.target.value;  // this指向的是myText 
  })
</script>


Proxy 也就是代理，可以帮助我们完成很多事情，例如对数据的处理，对构造函数的处理，对数据的验证，说白了，就是在我们访问对象前添加了一层拦截，可以过滤很多操作，而这些过滤，由你来定义。
 
语法
let p = new Proxy(target, handler);
参数

target ：需要使用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
handler: 一个对象，其属性是当执行一个操作时定义代理的行为的函数(可以理解为某种触发器)。
需要注意的一个点是，如果是在严格模式下使用proxy，在set方法中需要return true，否则会报错；

下面是数据双向绑定的简单实现 

复制代码
// html
<input type="text" v-model='content'>
<div v-bind='content'></div>
<hr>
<input type="text" v-model='title'>
<input type="text" v-model='title'>
<div v-bind='title'></div>
复制代码
复制代码
// 数据双向绑定
function View() {
  let proxy = new Proxy({}, {
    get() { },
    set(obj, key, value) {
      document.querySelectorAll(`[v-model=${key}]`).forEach(item => {
        item.value = value;
      });
      document.querySelectorAll(`[v-bind=${key}]`).forEach(item => {
        item.innerHTML = value;
      })
　　　 return true
    }
  })

  this.init = () => {
    document.querySelectorAll('[v-model]').forEach(item => {
      item.addEventListener('keyup', function () {
        proxy[this.getAttribute('v-model')] = this.value;
      })
    })
  }
}

new View().init();