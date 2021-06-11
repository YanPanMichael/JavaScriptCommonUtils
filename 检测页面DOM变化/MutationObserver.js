// MutationObserver
// MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。

// 构造函数
// MutationObserver()
// 创建并返回一个新的 MutationObserver 它会在指定的DOM发生变化时被调用。
// 方法
// disconnect()
// 阻止 MutationObserver 实例继续接收的通知，直到再次调用其observe()方法，该观察者对象包含的回调函数都不会再被调用。
// observe()
// 配置MutationObserver在DOM更改匹配给定选项时，通过其回调函数开始接收通知。
// takeRecords()
// 从MutationObserver的通知队列中删除所有待处理的通知，并将它们返回到MutationRecord对象的新Array中。

// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();

// 埋点方案实现
// 输入URL进入页面，在页面第一次渲染完成时，利用Chrome提供的MutationObserver
// API监听dom节点是否发生的变化，一旦发生变化即触发相应的回掉函数，回掉函数执行嵌入在网页内页的检测脚本，完成第一次文本检测。
// 之后用户进行业务操作，不断触发页面事件，引出弹层，或点击按钮，弹出表格等操作时，利用MutationObserver监听并触发回掉函数，反复执行检测脚本。
// 用户全程对检测脚本执行无感知，正常进行业务操作，但每一次业务操作的执行，都可以帮助我们检查页面文本信息的翻译情况，随着时间的推进，触发更多页面操作时，相应页面的功能也会被触发的更完整，从而可以计算出更准确的页面翻译覆盖率。

// 通过什么方法可以实现-检测页面 DOM 变化
// 在MVVM框架中,一是监听数据的变化,数据驱动视图

// 通过Object.defineProperties()来监听数据的变化,或使用proxy来代理和反射
// 通过某个API来监听DOM的变化(利用MutationObserver)来监听DOM的变化
// 注意 

// 当通过JS操作了DOM之后,我们需要通知到DOM来更新视图,在vue2.0中是用的Object.defineProperies()来劫持对象,而vue3.0中是使用proxy,维持了一个异步的队列,并不是修改了DOM就会立即更新到视图上面 

// Mutaion Observer API是用来监视DOM变动,DOM的任何变动,比如节点的增减,属性的变动,文本内容的变动

// 这个API都可以得到通知,Mutation Observer则是异步触发,DOM的变动并不会马上触发,而是要等到当前所有DOM操作都结束才触发,这样是为了应付DOM变动频繁的特点

// 提示

// 假设文档中连续插入 1000 个li元素,就会连续触发 1000 个插入事件,执行每个事件的回调函数,这很可能会造成浏览器的卡顿,而mutation Observer则完全不同,只在 1000 个段落都插入结束后才会触发,而且只会触发一次

// Mutation Observer有以下特点

// 等待所有脚本任务完成后,才会运行,采用异步方式
// 把DOM变动记录封装成一个数组进行处理,而不是单独处理个别的DOM变动
// 可以观察发生在DOM节点的所有变动,可以观察某一类变动
// 使用实例

// 创建一个观察器实例并监听`targetNode`元素的变动
const observer = new MutationObserver(() => {});
observer.observe(targetNode, config);

// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();


// 实例:

// MutationObserver的callback的回调函数是异步的,只有在全部DOM操作完成之后才会调用callback

<div id="target" class="block" name="target">
  target的第一个子节点
  <p>
    <span>target的后代</span>
  </p>
</div>
// 以下是js代码

var targetNode = document.getElementById('target');
var i = 0;
var observe = new MutationObserver(function (mutations, observe) {
  i++;
});
observe.observe(targetNode, { childList: true });
targetNode.appendChild(docuemnt.createTextNode('1'));
targetNode.appendChild(docuemnt.createTextNode('2'));
targetNode.appendChild(docuemnt.createTextNode('3'));
console.log(i); //1 callback的回调次数
应用

// 有时候,MutationObserver API都可以派上用场

// 通知web应用程序访问者,监测当前所在页面发生了一些更改,变化
// 正在开发一个新的javaScript框架,需要根据DOM的变化动态加载javaScript模块
// 结论

// MutationObserver提供了监视DOM树所做更改的能力,它被设计为旧的Mutation Events功能的替代品,该功能是DOM3 events规范的一部分(来自 MDN)
// MutationObserver在不影响浏览器性能的情况下响应DOM更改
// MutationObserver会等待所有脚本任务完成后,才会运行,采用异步方式
// MDN-MutatonObserver 介绍https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver