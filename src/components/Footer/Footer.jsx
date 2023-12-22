import { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

import './Footer.css'

export default class Footer extends Component {
  static propTypes = {
    toDo: PropTypes.number,
    filter: PropTypes.string,
    filterSwitch: PropTypes.func.isRequired,
    clearDone: PropTypes.func.isRequired,
  }

  static defaultProps = {
    filterSwitch: () => {},
    clearDone: () => {},
  }

  render() {
    const { toDo, filter, filterSwitch, clearDone } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>

        <TasksFilter filter={filter} filterSwitch={filterSwitch} />

        <button className="clear-completed" onClick={clearDone}>
          Clear completed
        </button>
      </footer>
    )
  }
}
