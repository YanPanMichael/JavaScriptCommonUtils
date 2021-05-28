useCallback 适用于所有的场景吗？
看完上面的疑问，你可能觉得 useCallback 也挺清晰的，那其实是你忘了第二个参数 inputs 而产生的错觉。有一个比较复杂的问题是，在当前的实现下，如果一个 callback 依赖于一个经常变化的 state，这个 callback 的引用是无法缓存的。React 文档的 FAQ 里也提到了这个问题，还原一下问题的场景：

  ```javascript
  function Form() {
    const [text, updateText] = useState('');

    const handleSubmit = useCallback(() => {
      console.log(text);
    }, [text]); // 每次 text 变化时 handleSubmit 都会变

    return (
      <>
        <input value={text} onChange={(e) => updateText(e.target.value)} />
        <ExpensiveTree onSubmit={handleSubmit} /> // 很重的组件，不优化会死的那种
      </>
    );
  }
  ```
这个问题无解的原因在于，callback 内部对 state 的访问依赖于 JavaScript 函数的闭包。如果希望 callback 不变，那么访问的之前那个 callback 函数闭包中的 state 会永远是当时的值。那让我们看一下 React 文档里的答案吧：

  ```javascript
  function Form() {
    const [text, updateText] = useState('');
    const textRef = useRef();

    useLayoutEffect(() => {
      textRef.current = text; // 将 text 写入到 ref
    });

    const handleSubmit = useCallback(() => {
      const currentText = textRef.current; // 从 ref 中读取 text
      alert(currentText);
    }, [textRef]); // handleSubmit 只会依赖 textRef 的变化。不会在 text 改变时更新

    return (
      <>
        <input value={text} onChange={e => updateText(e.target.value)} />
        <ExpensiveTree onSubmit={handleSubmit} />
      </>
    );
  }
  ```
文档里给出的解法乍一看可能不太好理解，我们一步步慢慢来。首先，因为在函数式组件里没有了 this 来存放一些实例的变量，所以 React 建议使用 useRef 来存放一些会发生变化的值，useRef 并不再单单是为了 DOM 的 ref 准备的，同时也会用来存放组件实例的属性。在 updateText 完成对 text 的更新后，再在 useLayoutEffect (等效于 didMount 和 didUpdate) 里写入 textRef.current 中。这样，在 handleSubmit 里取出的 textRef 中存放的值就永远是新值了。

是不是有一种恍然大悟的感觉。本质上我们想要达成的目标是以下几点：

能充分利用一个函数式组件多次 render 时产生的相同功能的 callback
callback 能不受闭包限制，访问到这个函数式组件内部最新的状态
而因为函数式组件对组件实例访问的限制。上文的方法这里是利用 useRef 创造一个在多次 render 时一般不会变化的 ref, 再将需要访问的值更新到这个 ref 中，来实现”穿透“闭包的功能。那么有没有别的办法呢？

  ```javascript
  function useCallback(callback) {
    const callbackHolder = useRef();

    useLayoutEffect(() => {
      callbackHolder.current = fn;
    });

    return useMemo(
      () =>  (...args) => (0, ref.current)(...args),
      []
    );
  }
  ```
这是一个不同于当前 React 内部 useCallback 实现的其他版本（参考自 issue）。反过来思考，创建一个用于存放最新 callback 的 ref，返回一个永远不变的”跳板“函数来达到实际调用最新的函数的作用。这样做还有一个更好的优点，这个缓存不需要依赖于显式的 inputs 声明，

这样是不是就完美了呢？肯定不是。。要不然这就肯定是官方的实现了。乍一看这个函数不会引入什么问题，但仔细看一下，在 DOM 更新时才对 ref.current 做更新，会导致在 render 阶段不能调用这个函数。更严重的是，因为对 ref 做了修改，在未来的 React 异步模式下可能会有诡异的情况出现（因此上文中官方的解法也是”异步模式不安全“的）。

值得期待的是，社区正在积极地讨论 useCallback 遇到的这些问题和解决方案。React 团队也计划在 React 的内部实现了一个更复杂，但是有效的版本。