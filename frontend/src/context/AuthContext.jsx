import { createContext, useContext, useEffect, useState } from "react";
import { SESSAO_EXPIRADA } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // Token recusado pela API: encerra a sessão. A RotaProtegida redireciona ao login.
  useEffect(() => {
    function aoExpirar() {
      localStorage.removeItem("token");
      setToken(null);
    }

    window.addEventListener(SESSAO_EXPIRADA, aoExpirar);
    return () => window.removeEventListener(SESSAO_EXPIRADA, aoExpirar);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
