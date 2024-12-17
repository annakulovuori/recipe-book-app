import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  //default token state is empty
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(null);

//check if token exists and set values to state
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
        setToken(storedToken)
        const decodedToken = jwtDecode(storedToken)
        setUsername(decodedToken.sub)
    }
  },[])

  return (
    <AuthContext.Provider
      value={{ username, token, authenticate, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
