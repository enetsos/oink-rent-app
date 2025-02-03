import { createContext, useState, useContext, ReactNode } from "react";
import { post, setAuthToken } from "@/services/api";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string,email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await post("/Auth/login", { email, password });
      setToken(data.token);
      setAuthToken(data.token);
    } catch (err : any) {
      console.log(err);
      setError(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await post("/Auth/register", { username, email, password });
      setToken(data.token);
      setAuthToken(data.token);
    } catch (err : any) {
      console.log(err);
      setError(err.response?.data[0]?.description || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};