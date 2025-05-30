"use client";

import { createContext, useContext } from "react";
import { UserInfo } from "firebase/auth";
import { Claims } from "next-firebase-auth-edge/lib/auth/claims";

export interface User extends UserInfo {
  emailVerified: boolean;
  customClaims: Claims;
  userId: bigint | null;
  onboarded: boolean;
  username: string | null;
  bio: string | null;
}

export interface AuthContextValue {
  user: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
