import { type Todo, type ListOfTodos, type todoIdAndCompleted, type todoId } from './types'

export const addTodo = async (todo: Todo): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8000/todoitems',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Error fetching data",error)
  }
}
  
export const updateTodo = async (todos: ListOfTodos): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8000/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todos)
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Error fetching data",error)
  }
}

export const uptadeTodoById = async (todo: todoIdAndCompleted): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:8000/update/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Error fetching data",error)
  }
}

export const deleteTodoById = async (todo: todoId): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:8000/delete/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: todo.id})
    })
    // const data = await response.json()
    // console.log(data)
  } catch (error) {
    console.log("Error fetching data",error)
  }
}