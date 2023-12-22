import PropTypes from 'prop-types'

import TodoListItem from '../Task/Task'

import './TaskList.css'

const TodoList = ({ todos, onDeleted, onDone, onEdit, taskEdit }) => {
  const elements = todos.map((item) => {
    const { id } = item
    return (
      <TodoListItem
        key={id}
        {...item}
        onDeleted={() => onDeleted(id)}
        onDone={() => onDone(id)}
        onEdit={() => onEdit(id)}
        taskEdit={taskEdit}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}
export default TodoList

TodoList.defaultProps = {
  onDelete: () => {},
}

TodoList.propTypes = {
  todos: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  taskEdit: PropTypes.func.isRequired,
}
