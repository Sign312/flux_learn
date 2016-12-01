import EventEmitter from 'events'

class ListStore extends EventEmitter {

    constructor() {
        super()
        this.items = []
    }

    getAll() {
        return this.items
    }

    addNewItemHandler(text) {
        this.items.push(text)
    }

    emitChange() {
        this.emit('change')
    }

    addChangeListener(callback) {
        this.on('change', callback)
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback)
    }
}

let listStore = new ListStore()

export default listStore