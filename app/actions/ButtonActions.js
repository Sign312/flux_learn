import AppDispatcher from 'app/dispatcher/AppDispatcher'

class ButtonActions {

    addNewItem(text) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        })
    }
}

export default ButtonActions