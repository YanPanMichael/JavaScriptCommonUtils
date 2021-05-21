// 如何监控 js 对象属性的变化?
// 方式 1:通过Object.defineProperty()来监听
var obj = {
  name: 'itclanCoder',
  phone: 13711767328,
};

Object.defineProperty(obj, 'phone', {
  configurable: true, // 属性可配置
  set: function(v) {
    console.log('phone发生了变化');
    this.phone = v;
  },
  get: function() {
    return this.phone;
  },
});
obj.phone = 15213467443;
// 要想监听属性的变化,首先需要通过Object.defineProperty()为需要监听的属性设置一个代理,
// 通过代理的值,触发set和get的方法 在这个方法中编写自己想要的逻辑操作

// 方法 2-使用 proxy 代理实现
var obj = {
  name: 'itclanCoder',
  phone: 13711767328,
};

var handler = {
  set: function(target, name, value) {
    console.log('phone发生了变化');
    // 改变被代理对象的值,使之保持一致
    target[name] = value;
  },
};

var proxy = new Proxy(obj, handler);
proxy.phone = 1371123765;
// 上面执行完后,会更新 phone 的值
