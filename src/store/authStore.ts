import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthSession {
  email: string;
  name: string;
}

interface AccountRecord {
  name: string;
  /** Demo-only storage; replace with a real backend for production. */
  password: string;
}

export type LogInResult = "ok" | "no_account" | "bad_password";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export interface AuthState {
  session: AuthSession | null;
  accounts: Record<string, AccountRecord>;
  signUp: (
    email: string,
    name: string,
    password: string
  ) => "ok" | "email_taken" | "invalid";
  logIn: (email: string, password: string) => LogInResult;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      accounts: {},
      signUp: (email, name, password) => {
        const key = normalizeEmail(email);
        if (!key || !password) return "invalid";
        if (get().accounts[key]) return "email_taken";
        set((s) => ({
          accounts: {
            ...s.accounts,
            [key]: { name: name.trim() || key.split("@")[0] || "User", password },
          },
          session: {
            email: key,
            name: name.trim() || key.split("@")[0] || "User",
          },
        }));
        return "ok";
      },
      logIn: (email, password) => {
        const key = normalizeEmail(email);
        const acc = get().accounts[key];
        if (!acc) return "no_account";
        if (acc.password !== password) return "bad_password";
        set({ session: { email: key, name: acc.name } });
        return "ok";
      },
      logOut: () => set({ session: null }),
    }),
    {
      name: "qme-auth",
      partialize: (s) => ({ accounts: s.accounts, session: s.session }),
    }
  )
);
