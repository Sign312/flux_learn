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