// 它真正连接 Redux 和 React，它包在我们的容器组件的外一层，它接收上面 Provider 提供的 store 里面的 state 和 dispatch，传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件。

// connect是一个高阶函数，首先传入mapStateToProps、mapDispatchToProps，然后返回一个生产Component的函数(wrapWithConnect)，
// 然后再将真正的Component作为参数传入wrapWithConnect，这样就生产出一个经过包裹的Connect组件，该组件具有如下特点:

// 通过props.store获取祖先Component的store
// props包括stateProps、dispatchProps、parentProps,合并在一起得到nextState，作为props传给真正的Component
// componentDidMount时，添加事件this.store.subscribe(this.handleChange)，实现页面交互
// shouldComponentUpdate时判断是否有避免进行渲染，提升页面性能，并得到nextState
// componentWillUnmount时移除注册的事件this.handleChange

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  return function wrapWithConnect(WrappedComponent) {
    class Connect extends Component {
      constructor(props, context) {
        // 从祖先Component处获得store
        this.store = props.store || context.store;
        this.stateProps = computeStateProps(this.store, props);
        this.dispatchProps = computeDispatchProps(this.store, props);
        this.state = { storeState: null };
        // 对stateProps、dispatchProps、parentProps进行合并
        this.updateState();
      }
      componentDidMount() {
        const { store } = this.context;
        this._updateProps();
        // 改变Component的state
        this.store.subscribe(() => {
          this.setState({
            storeState: this.store.getState()
          });
        });
      }
      shouldComponentUpdate(nextProps, nextState) {
        // 进行判断，当数据发生改变时，Component重新渲染
        if (propsChanged || mapStateProducedChange || dispatchPropsChanged) {
          this.updateState(nextProps);
          return true;
        }
      }
      _updateProps () {
        const { store } = this.context;
        let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {} // 防止 mapStateToProps 没有传入
        let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {} // 防止 mapDispatchToProps 没有传入
        this.setState({
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props
          }
        })
      }
      render() {
        // 生成包裹组件Connect
        return (
          <WrappedComponent {...this.nextState} />
        )
      }
    }
    Connect.contextTypes = {
      store: storeShape
    }
    return Connect;
  }
}