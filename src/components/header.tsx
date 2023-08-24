import { type todoTittle } from '../types'
import { AddTodo } from './addtodo'

interface Props {
  onAddTodo: ({ title }: todoTittle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
        <header className="header">
            <h1>todos</h1>
            <AddTodo saveTodo={onAddTodo}/>
        </header>
  )
}
