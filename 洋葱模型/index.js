// 为什么要用洋葱模型：
// 对后续中间件返回的结果进行处理，如计时

koa洋葱模型可以将中间件级联执行，由用户决定是否向下级中间件执行。
在koa中维护了一个数组用来保存中间件，在开启http服务器时，使用compose方法将中间件级联，取出数组中第一个执行，并返回Promise.resolve(middleware(ctx,dispatch(i++))),
dispatch传入数组中下一个索引当作中间件的next执行。
由于promise存在等待效果，因此使用async/await实现下级中间件的等待效果

// 题目需求
let middleware = []
middleware.push((next) => {
	console.log(1)
	next()
	console.log(1.1)
})
middleware.push((next) => {
	console.log(2)
	next()
	console.log(2.1)
})
middleware.push((next) => {
    console.log(3)
	next()
	console.log(3.1)
})
let fn = compose(middleware)
fn()
// /*
// 1
// 2
// 3
// 3.1
// 2.1
// 1.1
// */
// function compose(middleware) {
//     return function() {
//         dispatch(0)
//         function dispatch(i) {
//             const fn = middleware[i]
//             if(!fn) return null
//             fn(function next() {
//                 dispatch(i+1)
//             })
//         }
//     }
// }
//  优化，支持异步、传参
function compose(middleware) {
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

// 原理：
// middleware = [a, b, c]
// a(b(c()))