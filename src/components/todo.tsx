import { type todoId, type Todo as TodoType, type todoIdAndCompleted } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: todoId) => void
  onToggleCompleteTodo: ({ id, completed }: todoIdAndCompleted) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
  return (
        <div className="view">
            <input className="toggle"
            type="checkbox"
            checked={completed}
            onChange={(event) => {
              onToggleCompleteTodo({ id, completed: event.target.checked })
            }}/>
            <label>{title}</label>
            <button className="destroy"
            onClick={() => { onRemoveTodo({ id }) }}></button>
        </div>
  )
}
