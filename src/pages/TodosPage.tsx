import { useState, useEffect, useContext } from "react";
import { Todos } from "../components/todos";
import {
  type todoTittle,
  type FilterValue,
  type todoId,
  type todoIdAndCompleted,
  type ListOfTodos,
} from "../types";
import { TODO_FILTERS } from "../const";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { addTodo, deleteTodoById, uptadeTodoById } from "../repositories";
import { AuthContext } from "../context/AuthContex";

export const TodosPage = (): JSX.Element => {
  const { LogoutUser } = useContext(AuthContext);
  const [todos, setTodos] = useState<ListOfTodos>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleClearAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    const completedTodos = todos.filter((todo) => todo.completed);
    completedTodos.forEach((todo) => {
      deleteTodoById({ id: todo.id });
    });
  };

  const handleRemove = ({ id }: todoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    deleteTodoById({ id });
  };

  const handleCompleted = ({ id, completed }: todoIdAndCompleted): void => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(newTodos);
    uptadeTodoById({ id, completed });
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleNewTodo = ({ title }: todoTittle): void => {
    let newTodos: ListOfTodos = [];
    if (todos.length > 0) {
      newTodos = [
        ...todos,
        {
          title,
          id: todos[todos.length - 1].id + 1,
          completed: false,
        },
      ];
    } else {
      newTodos = [
        ...todos,
        {
          title,
          id: todos.length + 1,
          completed: false,
        },
      ];
    }
    setTodos(newTodos);
    const newTodo = {
      title,
      id: todos.length + 1,
      completed: false,
    };
    addTodo(newTodo);
  };

  const handleLogout = (): void => {
    LogoutUser();
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const fetchTodos = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8000/todoitems");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <div className="todoapp">
      <Header onAddTodo={handleNewTodo} />
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
        onLogout={handleLogout}
      />
    </div>
  );
};
