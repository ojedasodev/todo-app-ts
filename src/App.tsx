// import { useContext } from "react"
// import { Login } from "./pages/Login"
// import { TodosPage } from "./pages/TodosPage"
// import ProtectedRoute, { ProtectedRouteProps } from "./utils/ProtectedRoute"
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import { AuthContext, AuthProvider } from "./context/AuthContex"


// const App = (): JSX.Element => {

//   const { authenticated } = useContext(AuthContext);

//   const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
//     isAuthenticated: authenticated,
//     authenticationPath: '/',
//   };
  
//   return (
//     <div className="todoapp">
//       <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login/>}/>
//           <Route path="/todos" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<TodosPage/>}/>}/>
//         </Routes>
//       </Router>
//       </AuthProvider>
//     </div>
//   )
// }

// export default App

import React from "react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContex"
import Routes from "./Routes"

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
