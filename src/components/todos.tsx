import { type todoId, type ListOfTodos, type todoIdAndCompleted } from '../types'
import { Todo } from './todo'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: todoId) => void
  onToggleCompleteTodo: ({ id, completed }: todoIdAndCompleted) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo }) => {
  return (
        <ul className='todo-list'>
            {todos.map(todo => (
                <li key={todo.id}
                className={`${todo.completed ? 'completed' : ''}`}>
                <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                onRemoveTodo = {onRemoveTodo}
                onToggleCompleteTodo = {onToggleCompleteTodo}
                />
              </li>
            ))}
      </ul>
  )
}
