Redux实现原理解析及应用
==============

1、为什么要用redux
------------

在React中，数据在组件中是单向流动的，数据从一个方向父组件流向子组件（通过props）,所以，两个非父子组件之间通信就相对麻烦，redux的出现就是为了解决state里面的数据问题

2、Redux设计理念
-----------

Redux是将整个应用状态存储到一个地方上称为**store**,里面保存着一个状态树**store tree**,组件可以派发(dispatch)行为(action)给store,而不是直接通知其他组件，组件内部通过订阅**store**中的状态**state**来刷新自己的视图。

![](./Redux实现原理解析及应用 - 简书_files/6548744-df461a22f59ef7da.png)

redux-flow.png

3、Redux三大原则
-----------

*   1 唯一数据源
*   2 保持只读状态
*   3 数据改变只能通过纯函数来执行

### 1唯一数据源

> 整个应用的state都被存储到一个状态树里面，并且这个状态树，只存在于唯一的store中

### 2保持只读状态

> state是只读的，唯一改变state的方法就是触发action，action是一个用于描述以发生时间的普通对象

### 3数据改变只能通过纯函数来执行

> 使用纯函数来执行修改，为了描述action如何改变state的，你需要编写reducers

或许你读到这已经不知所云了，没事这只是让你了解一些redux到底是干嘛的，后面或详细的讲解各个部分的作用，并且会讲解redux实现原理

4、Redux概念解析
-----------

### 4.1 Store

*   store就是保存数据的地方，你可以把它看成一个数据，整个应用智能有一个store
*   Redux提供createStore这个函数，用来生成Store
```
  import {createStore} from 'redux'
  const store=createStore(fn);
```
    

### 4.2 State

state就是store里面存储的数据，store里面可以拥有多个state，Redux规定一个state对应一个View,只要state相同，view就是一样的，反过来也是一样的，可以通过**store.getState( )**获取

    import {createStore} from 'redux'
    const store=createStore(fn);
    const state=store.getState()
    

### 4.3 Action

state的改变会导致View的变化，但是在redux中不能直接操作state也就是说不能使用**this.setState**来操作，用户只能接触到View。在Redux中提供了一个对象来告诉Store需要改变state。Action是一个对象其中type属性是必须的，表示Action的名称，其他的可以根据需求自由设置。

    const action={
      type:'ADD_TODO',
      payload:'redux原理'
    }
    

在上面代码中，Action的名称是ADD_TODO，携带的数据是字符串‘redux原理’，Action描述当前发生的事情，这是改变state的唯一的方式

### 4.4 store.dispatch( )

store.dispatch( )是view发出Action的唯一办法

    store.dispatch({
      type:'ADD_TODO',
      payload:'redux原理'
    })
    

store.dispatch接收一个Action作为参数，将它发送给store通知store来改变state。

### 4.5 Reducer

Store收到Action以后，必须给出一个新的state，这样view才会发生变化。这种**state的计算过程**就叫做Reducer。  
Reducer是一个纯函数，他接收Action和当前state作为参数，返回一个新的state

> **注意：**Reducer必须是一个纯函数，也就是说函数返回的结果必须由参数state和action决定，而且不产生任何副作用也不能修改state和action对象

    const reducer =(state,action)=>{
      switch(action.type){
        case ADD_TODO:
            return newstate;
        default return state
      }
    }
    

5、Redux源码
---------

> 里面的注释就是我一步一步的分析，有点懒没有把代码拆分出来给你们看
```javascript
    let createStore = (reducer) => {
        let state;
        //获取状态对象
        //存放所有的监听函数
        let listeners = [];
        let getState = () => state;
        //提供一个方法供外部调用派发action
        let dispath = (action) => {
            //调用管理员reducer得到新的state
            state = reducer(state, action);
            //执行所有的监听函数
            listeners.forEach((l) => l())
        }
        //订阅状态变化事件，当状态改变发生之后执行监听函数
        let subscribe = (listener) => {
            listeners.push(listener);
        }
        dispath();
        return {
            getState,
            dispath,
            subscribe
        }
    }
    let combineReducers=(renducers) => {
        //传入一个renducers管理组，返回的是一个renducer
        return function(state={},action={}){
            let newState={};
            for(var attr in renducers){
                newState[attr]=renducers[attr](state[attr],action)
    
            }
            return newState;
        }
    }
    export {createStore,combineReducers};
```

6、Redux使用案例
-----------

html代码

    <div id="counter"></div>
      <button id="addBtn">+</button>
      <button id="minusBtn">-</button>
    

js代码
```javascript
    function createStore(reducer) {
        var state;
        var listeners = [];
        var getState = () => state;
        var dispatch = (action) => {
            state = reducer(state, action);
            listeners.forEach(l=>l());
        }
        var subscribe = (listener) => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter((l) => l != listener)
            }
        }
        dispatch();
        return {
            getState, dispatch, subscribe
        }
    }
    var reducer = (state = 0, action) => {
        if (!action) return state;
        console.log(action);
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
            default:
                return state;
        }
    }
    var store = createStore(reducer);
    store.subscribe(function () {
        document.querySelector('#counter').innerHTML = store.getState();
    });
    
    document.querySelector('#addBtn').addEventListener('click', function () {
        store.dispatch({type: 'INCREMENT'});
    });
    document.querySelector('#minusBtn').addEventListener('click', function () {
        store.dispatch({type: 'DECREMENT'});
    });
```