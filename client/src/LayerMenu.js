import React from "react"
import { connect } from "react-redux"
import { setActive } from "./actions.js"


class LayerMenu extends React.Component {
    render() {
        if (!this.props.visible) return null
        const items = this.props.items
        const listItems = items.map(item => {
            const onChange = this.handleChange(item)
            return <Item key={ item.id }
                         label={ item.label }
                         onChange={ onChange } />
        })
        return <fieldset>{ listItems }</fieldset>
    }

    handleChange(item) {
        return ((ev) => {
            const action = setActive({
                id: item.id,
                flag: ev.target.checked
            })
            this.props.dispatch(action)
        })
    }
}


class Item extends React.Component {
    render() {
        return (
            <div>
                <label>
                    <input type="checkbox"
                        key={ this.props.key }
                        onChange={ this.props.onChange } />
                    { this.props.label }
                </label>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const {
        layers: visible = false,
        datasets: items = []
    } = state
    return { visible, items }
}


export default connect(mapStateToProps)(LayerMenu)
