import { createContext, useContext, useState, useTransition } from "react"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");

  const usertoken = localStorage.getItem("usertoken");
  const isAutenticated = usertoken !== null;

  const logout = () => {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('user');
  }

  const login = async (login, pass) => {
    try {
      const response = await fetch(`http://localhost:51235/api/auth/?login=${login}&pass=${pass}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.error);
        return false;
      }

      const { usertoken } = await response.json();
      console.log(usertoken);

      localStorage.setItem('usertoken', usertoken);

      return true;

    } catch {
      setError("Servicio no disponible. Inténtelo de nuevo más adelante.");
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{
      usertoken,
      isAutenticated,
      login,
      logout,
      error
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}