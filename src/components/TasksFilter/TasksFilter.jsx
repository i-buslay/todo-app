import { Component } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default class TasksFilter extends Component {
  static propTypes = {
    filter: PropTypes.string,
    filterSwitch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    filter: 'all',
  }

  render() {
    const buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ]

    const { filter, filterSwitch } = this.props

    const btn = buttons.map((button) => {
      const activeButton = button.name === filter
      const style = activeButton ? 'selected' : ''

      return (
        <li key={button.name}>
          <button
            className={style}
            onClick={() => {
              filterSwitch(button.name)
            }}
          >
            {button.label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{btn}</ul>
  }
}
