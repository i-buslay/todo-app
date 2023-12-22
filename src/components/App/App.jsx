import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import NewTask from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TodoList from '../TaskList/TaskList'

import './App.css'

export default class App extends Component {
  minId = 0

  state = {
    todoData: [],
  }

  createTodoitem(task) {
    return {
      id: this.minId++,
      task,
      done: false,
      editing: false,
      date: formatDistanceToNow(new Date(), { includeSeconds: true, addSuffix: true }),
      created: new Date(),
    }
  }

  updateTime = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((i) => {
        return { ...i, date: formatDistanceToNow(i.created, { includeSeconds: true, addSuffix: true }) }
      }),
    }))
  }

  componentDidMount() {
    this.updateTime()
    this.timer = setInterval(this.updateTime, 2500)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((i) => i.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, editing: !oldItem.editing }

      return {
        todoData: todoData.toSpliced(idx, 1, newItem),
      }
    })
  }

  taskEdit = (id, task) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((i) => {
        if (i.id === id) {
          return { ...i, task, editing: false }
        }
        return i
      }),
    }))
  }

  addItem = (task) => {
    const newItem = this.createTodoitem(task)
    this.setState(({ todoData }) => {
      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((i) => i.id === id)

      return {
        todoData: todoData.toSpliced(idx, 1),
      }
    })
  }

  onDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((i) => i.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }

      return {
        todoData: todoData.toSpliced(idx, 1, newItem),
      }
    })
  }

  myFilter = (todoData, filter) => {
    switch (filter) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((i) => !i.done)
      case 'completed':
        return todoData.filter((i) => i.done)
      default:
        return todoData
    }
  }

  filterSwitch = (filter) => {
    this.setState({ filter })
  }

  clearDone = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((i) => !i.done),
    }))
  }

  render() {
    const { todoData, filter } = this.state
    const notDone = todoData.filter((i) => !i.done).length
    const visible = this.myFilter(todoData, filter)

    return (
      <section className="todoapp">
        <NewTask onAddItem={this.addItem} />
        <TodoList
          todos={visible}
          onDeleted={this.deleteItem}
          onDone={this.onDone}
          onEdit={this.onEdit}
          taskEdit={this.taskEdit}
        />
        <Footer toDo={notDone} filter={filter} filterSwitch={this.filterSwitch} clearDone={this.clearDone} />
      </section>
    )
  }
}
