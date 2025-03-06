import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");

  const userToken = localStorage.getItem("userToken");
  const isAutenticated = userToken !== null;

  const logout = () => {
    localStorage.removeItem('userToken');
  }

  const login = async (login, pass) => {
    try {
      const response = await fetch(`http://localhost:51235/api/auth/login?login=${login}&pass=${pass}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.error);
        return false;
      }

      const { userToken } = await response.json();

      localStorage.setItem('userToken', userToken);

      return true;

    } catch {
      setError("Servicio no disponible. Inténtelo de nuevo más adelante.");
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{
      userToken,
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