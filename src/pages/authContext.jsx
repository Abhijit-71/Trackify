import { useContext, createContext, useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Navigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("tokens") || "");

  const apiUrl = "http://127.0.0.1:8000/"


  const axiosInstance = axios.create({
    baseURL: apiUrl + "api/",
  });

  const loginAction = async () => {
    axiosInstance.interceptors.request.use(
      async (config) => {
        let tokens = JSON.parse(localStorage.getItem("tokens"));

        if (!tokens) {
          return config;
        }

        if (tokens?.access) {
          if (jwtDecode(tokens.access).exp * 1000 < Date.now()) {
            if (tokens.refresh) {
              try {
                const response = await axios.post(
                  apiUrl + "api/refreshtoken/",
                  {
                    refresh: tokens.refresh,
                  }
                );
                localStorage.setItem("tokens", JSON.stringify(response.data));
                config.headers[
                  "Authorization"
                ] = `Bearer ${response.data.access}`;
              } catch (error) {
                // if tokens.refresh post fails (refresh token expires)
                localStorage.removeItem("tokens");
                alert("user logged out !!");
                // removes all tokens and alerts with redirect to login page
                <Navigate to="/login" />
              }
            }
          } else {
            config.headers["Authorization"] = `Bearer ${tokens.access}`;
          }
        }
        return config; // returns config can be called later
      },
      (error) => Promise.reject(error)
    );

    return axiosInstance;
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("tokens");
    
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthWatcher = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("tokens");

    if (!storedToken) {
      setChecking(false);
      navigate("/login");
      return;
    }

    try {
      const token = JSON.parse(storedToken);
      const isExpired = jwtDecode(token.access).exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem("tokens");
        setChecking(false);
        navigate("/login");
      } else {
        setChecking(false);
        // No redirect needed here; user is valid
      }
    } catch (error) {
      console.error("Token parsing error:", error);
      localStorage.removeItem("tokens");
      setChecking(false);
      navigate("/login");
    }
  }, []);

  return null; // No UI needed
};


export const PublicRoute = ({ children }) => {
  const storedToken = localStorage.getItem("tokens");

  if (!storedToken) return children;

  try {
    const token = JSON.parse(storedToken);

    if (typeof token.access !== "string") throw new Error("Invalid token");


    if (jwtDecode(token.access).exp * 1000 > Date.now()) {
      return <Navigate to="/dashboard" />;
    }

    return children;

  } catch (error) {
    console.error("Token error:", error);
    return children;
  }
};