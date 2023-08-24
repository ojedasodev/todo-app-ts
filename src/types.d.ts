import { type TODO_FILTERS } from './const'

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type todoId = Pick<Todo, 'id'>
export type todoIdAndCompleted = Pick<TodoType, 'id' | 'completed'>
export type todoTittle = Pick<Todo, 'title'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
