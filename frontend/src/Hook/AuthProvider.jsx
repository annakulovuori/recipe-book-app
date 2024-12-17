import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //default token state is empty
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(null);

  //check if token exists and set values to state
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUsername(decodedToken.sub);
    }
  }, []);

  const authenticate = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/authenticate",
        { email, password }
      );
      if (response.data.token) {
        setToken(response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        setUsername(decodedToken.sub);
        localStorage.setItem("token", response.data.token);
        return response.data;
      }
      throw new Error("Authentication failed, cannot find token");
    } catch (error) {
      throw new Error("Error during authentication");
    }
  };

  const register = async (nickname, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { nickname, email, password }
      );
      if (response.data.token) {
        setToken(response.data.token);
        const decodedToken = jwtDecode(response.data.token);
        setUsername(decodedToken.sub);
        localStorage.setItem("token", response.data.token);
        return response.data;
      }
      throw new Error("Registration failed, cannot find token");
    } catch (error) {
      throw new Error("Error during registration");
    }
  };

  return (
    <AuthContext.Provider
      value={{ username, token, authenticate, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
