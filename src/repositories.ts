import { type Todo, type todoIdAndCompleted, type todoId } from './types'


export const addTodo = async (todo: Todo, access: string): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8000/todoitems',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${String(access)}`
        },
        body: JSON.stringify(todo)
      })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log('Error fetching data', error)
  }
}

export const uptadeTodoById = async (todo: todoIdAndCompleted, access:string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:8000/update/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`
      },
      body: JSON.stringify(todo)
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log('Error fetching data', error)
  }
}

export const deleteTodoById = async (todo: todoId, access: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:8000/delete/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${String(access)}`
      },
      body: JSON.stringify({ id: todo.id })
    })
    // const data = await response.json()
    console.log(response)
  } catch (error) {
    console.log('Error fetching data', error)
  }
}
