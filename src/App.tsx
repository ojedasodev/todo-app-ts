import { useState } from 'react'
import { Todos } from './components/todos'
import { type todoTittle, type FilterValue, type todoId, type todoIdAndCompleted } from './types'
import { TODO_FILTERS } from './const'
import { Footer } from './components/footer'
import { Header } from './components/header'

const mockTodo = [
  {
    id: '1',
    title: 'ver twich de midu',
    completed: true
  },
  {
    id: '2',
    title: 'aprender react con typescript',
    completed: false
  },
  {
    id: '3',
    title: 'comprar un ticket',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodo)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleClearAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const handleRemove = ({ id }: todoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: todoIdAndCompleted): void => {
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleNewTodo = ({ title }: todoTittle): void => {
    const newTodos = [...todos, {
      title,
      id: crypto.randomUUID(),
      completed: false
    }]
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className="todoapp">
      <Header
        onAddTodo={handleNewTodo}
      />
      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />
      <Footer
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={handleClearAllCompleted}
      />
    </div>
  )
}

export default App
