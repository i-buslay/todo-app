import { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTask extends Component {
  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onAddItem: () => {},
  }

  state = {
    task: '',
  }

  onItemChange = (e) => {
    this.setState({
      task: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (this.state.task.length > 0) {
      this.props.onAddItem(this.state.task)
    }

    this.setState({
      task: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onItemChange}
            value={this.state.task}
            autoFocus
          />
        </form>
      </header>
    )
  }
}
