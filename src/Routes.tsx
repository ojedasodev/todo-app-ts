import { useContext } from "react";
import { Routes as Router, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContex";
import { Login } from "./pages/Login";
import { TodosPage } from "./pages/TodosPage";
import ProtectedRoute, { ProtectedRouteProps } from "./utils/ProtectedRoute";

// const PrivateRoutes = () => {
//   const { authenticated } = useContext(AuthContext);

//   if (!authenticated) return <Navigate to="/" replace />;

//   return <Outlet />;
// };

const Routes = () => {
  const { authenticated } = useContext(AuthContext);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: !!authenticated,
    authenticationPath: "/",
  };

  return (
    <Router>
      <Route path="/" element={<Login />} />
      <Route
        path="/todos"
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<TodosPage />}
          />
        }
      />
    </Router>
  );
};

export default Routes;
