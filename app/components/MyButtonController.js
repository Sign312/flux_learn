import React, {Component} from 'react'
import MyButton from 'app/components/MyButton'
import listStore from 'app/stores/listStore'
import ButtonActions from 'app/actions/ButtonActions'

let buttonActions = new ButtonActions()

class MyButtonController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        listStore.addChangeListener(this._onChange.bind(this))
    }

    componentWillUnmount() {
        listStore.removeChangeListener(this._onChange.bind(this))
    }

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
        buttonActions.addNewItem('new item')
    }
}

export default MyButtonController