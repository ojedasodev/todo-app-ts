import { useState } from 'react'
import { type todoTittle } from '../types'

interface Props {
  saveTodo: ({ title }: todoTittle) => void
}

export const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
        <input
        className='new-todo'
        placeholder="What would you like to do?"
        value={inputValue}
        type="text"
        onChange={(event) => { setInputValue(event.target.value) }}
        autoFocus
        />
    </form>
  )
}
