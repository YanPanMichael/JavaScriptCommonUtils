 //在Function的原型上自定义myBind()方法
 Function.prototype.myBind = function myBind(context){
  //获取要操作的函数
  var _this=this;
  //获取实参（context除外）
 var args=Array.prototype.slice.call(arguments,1);
 //判断当前浏览器是否兼容bind()方法
if('bind' in Function.prototype){
    //如果浏览器兼容bind()方法，则使用bind()方法，并返回bind()方法执行后的结果
    return _this.bind(context,args);
 }
 //如果不兼容bind()方法，则返回一个匿名函数
 return function(){
      _this.apply(context,args);
  }
}