// 中间件核心代码，koa的实现原理，洋葱模型
/**
 * Compose `middleware` returning
 * @param {Array} middleware
 * @return {Function}
 */
import { NextFunction } from './interface';
import Context from './context';

// 洋葱模型compose
export default function compose(middleware: NextFunction[]) {
  return function (context: Context, next?: NextFunction) {
    let index = -1;
    function dispatch(i: number) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[i];
      // @ts-ignore
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  };
}

function compose_simple(middleware) {
    return function() {
        dispatch(0)
        function dispatch(i) {
            const fn = middleware[i]
            if(!fn) return null
            fn(function next() {
                dispatch(i+1)
            })
        }
    }
}
//  优化，支持异步、传参
function compose_simple_async(middleware) {
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

function compppp(...middleware) {
  return async function() {
    await dispatch(0);
    async function dispatch(i) {
      const fn = middleware[i];
      if(!fn) return null;
      await fn(function next() {
        dispatch(i+1);
      })
    }
  }
}

// let middleware = []
// middleware.push((next) => {
// 	console.log(1)
// 	next()
// 	console.log(1.1)
// })
// middleware.push((next) => {
// 	console.log(2)
// 	next()
// 	console.log(2.1)
// })
// middleware.push((next) => {
//     console.log(3)
// 	next()
// 	console.log(3.1)
// })
// let fn = compose(middleware)
// fn();
