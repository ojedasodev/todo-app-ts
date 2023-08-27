import { type TODO_FILTERS } from './const'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export interface loginFormFields {
  username: string
  password: string
}

export interface DecodedToken {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  username: string
}

export interface Tokens {
  access: string
  refresh: string
}

export type todoId = Pick<Todo, 'id'>
export type todoIdAndCompleted = Pick<TodoType, 'id' | 'completed'>
export type todoTittle = Pick<Todo, 'title'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
