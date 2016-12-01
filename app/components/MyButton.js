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