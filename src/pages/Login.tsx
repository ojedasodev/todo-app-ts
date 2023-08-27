import { LoginForm } from "../components/loginForm";
import { loginFormFields } from "../types";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";

export const Login = (): JSX.Element => {
  const { LoginUser } = useContext(AuthContext);

  const handleSubmit = ({ username, password }: loginFormFields): void => {
    LoginUser(username, password);
  };

  return (
    <div className="todoapp">
      <h1>login</h1>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
