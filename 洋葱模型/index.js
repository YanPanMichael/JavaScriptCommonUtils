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