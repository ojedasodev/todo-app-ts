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
  const { LogoutUser, user, authTokens } = useContext(AuthContext);
  const [todos, setTodos] = useState<ListOfTodos>([]);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchTodos();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClearAllCompleted = (): void => {
    const completedTodos = todos.filter((todo) => todo.completed);
    completedTodos.forEach((todo) => {
      void deleteTodoById({ id: todo.id }, String(authTokens.access));
    });
  };

  const handleRemove = ({ id }: todoId): void => {
    void deleteTodoById({ id }, String(authTokens.access));
  };

  const handleCompleted = ({ id, completed }: todoIdAndCompleted): void => {
    void uptadeTodoById({ id, completed }, String(authTokens.access));
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleNewTodo = ({ title }: todoTittle): void => {
    const newTodo = {
      title,
      user: user.user_id,
      completed: false,
    };
    void addTodo(newTodo, String(authTokens.access));
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
      const response = await fetch("http://localhost:8000/todoitems", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${String(authTokens.access)}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setTodos(data);
      } else if (response.statusText === "Unauthorized") {
        LogoutUser();
      }
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
