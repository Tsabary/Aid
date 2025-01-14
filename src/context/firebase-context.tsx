import { createContext, useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

import firebaseConfig from "../../firebaseConfig";

type FirebaseContextProps = {
  auth: Auth;
};

export const FirebaseContext = createContext<Partial<FirebaseContextProps>>({});

export const FirebaseProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState<Auth>();

  useEffect(() => {
    const newApp =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    setAuth(getAuth(newApp));
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};
