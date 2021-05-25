/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose(...funcs) {
  if(funcs.length === 0) {
    return args => args;
  }
  if(funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((sum, cur) => (...args) => sum(cur(...args)), value => value);
}

var funcList = [(res)=>console.log('res'+res), function(){return Math.max(...arguments)}]
// 注意输入参数一定是...funcList
compose(...funcList)(2,3,4,5)