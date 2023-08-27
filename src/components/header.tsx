import { type todoTittle } from "../types";
import { AddTodo } from "./addtodo";
import { AuthContext } from "../context/AuthContex";
import { useContext } from "react";

interface Props {
  onAddTodo: ({ title }: todoTittle) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  const { user } = useContext(AuthContext);
  return (
    <header className="header">
      <h1>To do</h1>
      <h2>Welcome {user.username}</h2>
      <AddTodo saveTodo={onAddTodo} />
    </header>
  );
};
