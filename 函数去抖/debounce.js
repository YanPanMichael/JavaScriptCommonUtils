import { debounce } from lodash;
import moment from 'moment';

function queryAlarmNotifiers({...searchWord}) {
  return Promise.resolve({data: {users: []}});
}
function queryBudgets() {
  return Promise.resolve({data: {fundBudgets: []}});
}

const fetchData = debounce(async (searchWord) => {
  try {
    const { data } = await queryAlarmNotifiers({ searchWord });
    if (fetchId !== this.lastFetchId || !this.state.searchWord) {
      return;
    }
    const { users: list } = data || { users: [] };
    this.setState({ list, loading: false }, async () => {
      try {
        const { data } = await queryBudgets({
          budgetId: searchWord,
          pageIndex: 1,
          pageSize: 10,
        });
        const fundBudgets = data?.fundBudgets || [];
        const budgetList = fundBudgets.map(item => (
          Object.assign(item, {
            balanceAmount: fen2yuan(item.balanceAmount), // 预算库剩余预算
            useBeginTime: moment(item.useBeginTime), // 预算使用开始时间
            useEndTime: moment(item.useEndTime), // 预算使用结束时间
          })
        ));
        this.setState({ budgetList });
      } finally {
        this.setState({ loading: false });
      }
    });
  } catch (err) {
    this.setState({ loading: false });
  }
}, 800)

// debounce源码
function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  var timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = Array.prototype.slice.call(arguments, 0)

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

/**
*
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  执行间隔，单位是毫秒（ms）
*
* @return {Function}     返回一个“节流”函数
*/
function throttle(fn, threshhold) {
  // 记录上次执行的时间
  var last
  // 定时器
  var timer
  // 默认间隔为 250ms
  threshhold || (threshhold = 250)
  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = Array.prototype.slice.call(arguments, 0)

    var now = +new Date()
    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)
    // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

// 另一种方式实现
function debounce(fn, delay, options = {}) {
  let last_call;
  let context;//上下文
  let args; //参数
  let now;
  let {leading, trailing, maxWait} = options;
  let timer;
  let first = true; // leading时能否触发的flag

  let exec = function () {
      last_call = new Date().getTime();
      fn.apply(context, args);
  };

  return function () {
      context = this;
      args = arguments;

      now = new Date().getTime();

      clearTimeout(timer);
      timer = setTimeout(function () {
          if (trailing) {
              exec();
          }

          // 保证下一次leading可用
          first = true;
          // 要重置last_call 保证停止再执行的情况下时间无误
          last_call = null;
      }, delay);

      if (first && leading) {
          first = false;
          exec();
          return;
      }

      if (maxWait && !last_call) {
          last_call = now;
      }
      if (maxWait && now - last_call >= maxWait) {
          exec();
      }

  };
};
_.debounce = debounce;
_.throttle = function (fn, delay, option) {
  return debounce(fn, delay, {
      ...option,
      maxWait: delay
  });
};