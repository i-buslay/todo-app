import { Component } from 'react'
import PropTypes from 'prop-types'

import './Task.css'

export default class TodoListItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    task: PropTypes.string,
    editing: PropTypes.bool,
    done: PropTypes.bool,
    date: PropTypes.string,
    onDeleted: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onDeleted: () => {},
    onDone: () => {},
    onEdit: () => {},
  }

  state = {
    id: this.props.id,
    task: '',
  }

  valueChange = (e) => {
    this.setState({
      task: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.taskEdit(this.state.id, this.state.task)

    this.setState({
      id: this.props.id,
      task: this.state.task,
      edit: false,
    })
  }

  render() {
    const { id, task, editing, done, date, onDeleted, onDone, onEdit } = this.props

    const style = {
      className: '',
    }

    if (done) {
      style.className = 'completed'
    }

    if (editing) {
      style.className = 'editing'
    }

    return (
      <div>
        {editing ? (
          <li className={style.className}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className="description">{task}</span>
                <span className="created">created {date}</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
            <form onSubmit={this.onSubmit}>
              <input type="text" className="edit" defaultValue={task} onChange={this.valueChange} autoFocus />
            </form>
          </li>
        ) : (
          <li className={style.className}>
            <div className="view">
              <input className="toggle" id={id} type="checkbox" onClick={onDone} defaultChecked={done ? true : false} />
              <label htmlFor={id}>
                <span className="description">{task}</span>
                <span className="created">created {date}</span>
              </label>
              <button className="icon icon-edit" onClick={onEdit}></button>
              <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
          </li>
        )}
      </div>
    )
  }
}
