"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";

type User = { id: number; email: string; role: string } | null;

type AuthContextType = {
  user: User;
  setUser: (u: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    api.get("/auth/me").then(res => setUser(res.data)).catch(() => {});
  }, []);

  const logout = () => {
    document.cookie = "access_token=; Max-Age=0";
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}