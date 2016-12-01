import flux from 'flux'
import listStore from 'app/stores/listStore'

let Dispatcher = flux.Dispatcher;
let AppDispatcher = new Dispatcher();

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
