# flux_learn
学习Flux时根据阮一峰老师的[Flux 架构入门教程]用es6改写的demo

# Flux架构小白入门笔记

Flux是facebook提出的一种处理前端数据的架构，学习Flux就是学习它的思想。

这个笔记是我在学习了阮一峰老师的[Flux 架构入门教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)之后得出，
里面的例子和部分原文来自于其,不同在于我用es6将其改写了，并加入了注释。

做了两三个前端外包项目，都是后端提供数据接口，逻辑主要由前端完成，深感前端逻辑之复杂，
特别是最近的一个项目，到后期业务逻辑代码混在一起根本无法维护。于是痛定思痛，想下定决心研究下前端架构方案，
而Flux则是现在最火，最受好评的前端架构方案。

本例代码仓库:[flux_learn,喜欢的话给个star哦！](https://github.com/flypie2/flux_learn)

---

我们按Flux数据流的顺序来分析，

View发起Action->Action传递到Dispatcher->Dispatcher将通知Store->Store的状态改变通知View进行改变

View由React组件构成，首先是MyButton.js

    import React, {Component} from 'react'
    
    class MyButton extends Component {
    
        render() {
            let items = this.props.items;
            return (
                <div>
                    <ul>
                        {items.map((result, key) => {
                            return (
                                <div key={key}>{result}</div>
                            )
                        })}
                    </ul>
                    <button onClick={this.props.onClick}>New Item</button>
                </div>
            )
        }
    }
    
    export default MyButton

额，这个组件貌似没啥好讲的，会React和es6的一下就能看懂。。。

接下来是由对MyButton进行封装的MyButtonController.js

    import React, {Component} from 'react'
    import MyButton from 'app/components/MyButton'
    import listStore from 'app/stores/listStore'
    import ButtonActions from 'app/actions/ButtonActions'
    
    //对Action发生器进行初始化，buttonActions能发出不同类型action给Dispatcher
    let buttonActions = new ButtonActions()
    
    class MyButtonController extends Component {
    
        constructor(props) {
            //把props作为参数传递到super(),这样在constructor里即可访问this.props属性
            super(props)
            this.state = {
                items: []
            }
        }
    
        componentDidMount() {
            //在组件挂载后绑定组件的私有方法_onChange到Store,之后listStore状态变化即可通知组件调用_onChange方法进行改变
            listStore.addChangeListener(this._onChange.bind(this))
        }
    
        componentWillUnmount() {
            //在组件移除后解除绑定组件的私有方法_onChange到Store
            listStore.removeChangeListener(this._onChange.bind(this))
        }
    
        //组件响应Store变化的回调函数
        _onChange() {
            this.setState({
                items: listStore.getAll()
            })
        }
    
        render() {
            return (
                <MyButton
                    items={this.state.items}
                    onClick={this.createNewItem}
                />
            )
        }
    
        createNewItem() {
            //调用Action发生器发出增加Item的Action
            buttonActions.addNewItem('new item')
        }
    }
    
    export default MyButtonController
    
在我们点击新增按钮后调用createNewItem方法发出一个'ADD_NEW_ITEM'的Action到Dispatcher

接下来我们看看ButtonActions.js

    import AppDispatcher from 'app/dispatcher/AppDispatcher'
    
    class ButtonActions {
    
        //发送ADD_NEW_ITEM的Action的方法
        addNewItem(text) {
            //调用Dispatcher获取actionType为ADD_NEW_ITEM的Action
            AppDispatcher.dispatch({
                actionType: 'ADD_NEW_ITEM',
                text: text
            })
        }
    }
    
    export default ButtonActions
    
    
这里的addNewItem方法发起了一个actionType为ADD_NEW_ITEM的Action到Dispatcher

然后我们再看AppDispatcher.js

    import flux from 'flux'
    import listStore from 'app/stores/listStore'
    
    //拿到flux模块里的Dispatcher类
    let Dispatcher = flux.Dispatcher;
    //用Dispatcher类new一个AppDispatcher对象
    let AppDispatcher = new Dispatcher();
    
    //调用register方法注册接收到各种actionType的Action之后的回调函数
    AppDispatcher.register(function (action) {
        switch (action.actionType) {
            case 'ADD_NEW_ITEM':
                listStore.addNewItemHandler(action.text)
                listStore.emitChange()
                break;
            default:
        }
    })
    
    export default AppDispatcher

最后是ListStore.js

    import EventEmitter from 'events'
    
    class ListStore extends EventEmitter {
    
        constructor() {
            super()
            //初始化数据
            this.items = []
        }
        
        //返回所有数据的方法
        getAll() {
            return this.items
        }
    
        //增加数据的处理函数
        addNewItemHandler(text) {
            this.items.push(text)
        }
    
        //提交变化
        emitChange() {
            this.emit('change')
        }
    
        //监听函数，当有变化时调用注册的回调方法
        addChangeListener(callback) {
            this.on('change', callback)
        }
    
        //remore监听函数
        removeChangeListener(callback) {
            this.removeListener('change', callback)
        }
    }
    
    //new一个listStore作为单例暴露给其它模块使用
    let listStore = new ListStore()
    
    export default listStore
    
它负责记录数据和状态并在有变化时改变View
