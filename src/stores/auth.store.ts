"use client";
import { create } from "zustand";
import type { Role } from "@/types/domain";
import { demoPassword, demoUsers } from "@/config/roles";
interface AuthState {
  role: Role | null;
  hydrated: boolean;
  hydrate: () => void;
  login: (email: string, password: string) => boolean;
  switchRole: (role: Role) => void;
  logout: () => void;
}
const KEY = "school-erp-demo-role";
export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  hydrated: false,
  hydrate: () => {
    let role: Role | null = null;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && saved in demoUsers) role = saved as Role;
    } catch {}
    set({ role, hydrated: true });
  },
  login: (email, password) => {
    const user = Object.values(demoUsers).find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!user || password !== demoPassword) return false;
    try {
      localStorage.setItem(KEY, user.role);
    } catch {}
    set({ role: user.role });
    return true;
  },
  switchRole: (role) => {
    try {
      localStorage.setItem(KEY, role);
    } catch {}
    set({ role });
  },
  logout: () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    set({ role: null });
  },
}));
