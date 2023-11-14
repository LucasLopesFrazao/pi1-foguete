"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "./firebaseApp";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>({});

const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user == null) {
        router.replace("/");
      }
    });
  }, [router]);

  function logUserOut() {
    signOut(auth);
    router.replace("/");
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          currentUser,
          loading,
          logUserOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContextProvider, useAuth };
