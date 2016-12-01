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