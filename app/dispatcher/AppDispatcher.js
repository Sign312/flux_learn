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
