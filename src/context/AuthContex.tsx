import { createContext, ReactNode, useEffect, useState } from "react";
import { type DecodedToken, type Tokens } from "../types";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {} from "react-router-dom";

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  user: DecodedToken;
  authTokens: Tokens;
  setUser: (value: DecodedToken) => void;
  setAuthTokens: (value: Tokens) => void;
  LoginUser: (username: string, password: string) => void;
  LogoutUser: () => void;
};

const initialValue: IAuthContext = {
  authenticated: false,
  user: {
    token_type: "",
    exp: 0,
    iat: 0,
    jti: "",
    user_id: 0,
    username: "",
  },
  setUser: () => {},
  setAuthenticated: () => {},
  authTokens: { access: "", refresh: "" },
  setAuthTokens: () => {},
  LoginUser: () => {},
  LogoutUser: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const tokens = localStorage.getItem("tokens")
    ? JSON.parse(localStorage.getItem("tokens")!)
    : initialValue.authTokens;
  const [authenticated, setAuthenticated] = useState(
    tokens == initialValue.authTokens ? false : true
  );
  const [authTokens, setAuthTokens] = useState(tokens);
  const [user, setUser] = useState(
    tokens == initialValue.authTokens
      ? initialValue.user
      : jwt_decode(tokens.access)
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const LoginUser = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(jwt_decode(data.access));
        setAuthTokens(data);
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthenticated(true);
        navigate("/todos");
      } else {
        console.log(response.status);
        console.log("Wrong username or password");
        alert("Wrong username or password");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const LogoutUser = (): void => {
    localStorage.removeItem("tokens");
    setUser(initialValue.user);
    setAuthenticated(false);
    setAuthTokens(initialValue.authTokens);
    navigate("/");
  };

  const updateTokens = async () => {
    console.log("update token called", authTokens.refresh);
    let response = await fetch("http://localhost:8000/token/refresh", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        refresh: authTokens.refresh,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("tokens", JSON.stringify(data));
    } else {
      LogoutUser();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (authTokens != initialValue.authTokens) {
        updateTokens();
      }
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        authTokens,
        setAuthTokens,
        user,
        setUser,
        LoginUser,
        LogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
