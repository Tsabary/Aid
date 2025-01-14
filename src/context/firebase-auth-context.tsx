import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  User as AuthUser,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import useFirebase from "../hooks/useFirebase";

type FirebaseAuthContextProps = {
  authUser?: AuthUser | null;
  signUpWithEmail?: (email: string, password: string) => Promise<void>;
  loginWithEmail?: (email: string, password: string) => Promise<void>;
  signInWithGoogle?: () => Promise<void>;
  signInWithApple?: () => Promise<void>;
  addEmailLoginPassword?: (newPassword: string) => Promise<void>;
  sendPasswordReset?: (email: string) => void;
  sendVerification?: (authUser?: AuthUser) => Promise<void>;
  reauthenticate?: (userProvidedPassword: string) => Promise<void>;
  verifyPin?: (pinCode: string) => Promise<void>;
  changePassword?: (
    userProvidedPassword: string,
    newPassword: string
  ) => Promise<void>;
  logout?: () => Promise<void>;
  isUserVerified?: boolean;
  deleteAccount?: () => Promise<void>;
};

export const FirebaseAuthContext = createContext<FirebaseAuthContextProps>({});

export const FirebaseAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { auth } = useFirebase();

  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const [isUserVerified, setIsUserVerified] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  // This useEffect listens for changes in the auth state
  useEffect(() => {
    if (!auth) {
      console.log("Firebase auth wasn't initialized properly");
      return;
    }

    const authStateListener = onAuthStateChanged(auth, (u) => {
      if (u) {
        setAuthUser(u);
        setIsUserVerified(u.emailVerified);
      } else {
        setLoadingInitial(false);
        setAuthUser(null);
      }
    });

    return authStateListener;
  }, [auth]);

  const deleteAccount = async () => {
    try {
      if (!authUser) {
        throw new Error("Please authenticate first");
      }

      await authUser.delete();
    } catch (err: unknown) {
      let message = "Failed to delete account: ";
      if (err instanceof Error) {
        message += err.message;
      }
      throw new Error(message);
    }
  };

  const sendVerification = useCallback(
    async (authUserProp?: AuthUser) => {
      try {
        const userToSendVerification = authUser ?? authUserProp;

        if (userToSendVerification) {
          await sendEmailVerification(userToSendVerification);
        } else {
          throw new Error("Please authenticate first: sendVerification");
        }
      } catch (err: unknown) {
        let message = "Failed to send verification: ";
        if (err instanceof Error) {
          message += err.message;
        }
        throw new Error(message);
      }
    },
    [authUser]
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        if (!auth) {
          throw new Error("Firebase wasn't initialized properly");
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendVerification(userCredential.user);
      } catch (err: unknown) {
        let message = "Failed to sign up: ";
        if (err instanceof Error) {
          message += err.message;
        }
        throw new Error(message);
      }
    },
    [auth, sendVerification]
  );

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        if (!auth) {
          throw new Error("Firebase wasn't initialized properly");
        }
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err: unknown) {
        let message = "Failed to login: ";
        if (err instanceof Error) {
          message += err.message;
        }
        throw new Error(message);
      }
    },
    [auth]
  );

  const signInWithGoogle = async () => {
    try {
      if (!auth) {
        throw new Error("Firebase wasn't initialized properly");
      }

      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      let message = "Failed to sign in with Google: ";
      if (err instanceof Error) {
        message += err.message;
      }
      console.log(message);
    }
  };

  const signInWithApple = async () => {
    try {
      if (!auth) {
        throw new Error("Firebase wasn't initialized properly");
      }

      const provider = new OAuthProvider("apple.com");
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      let message = "Failed to sign in with Apple: ";
      if (err instanceof Error) {
        message += err.message;
      }
      console.log(message);
    }
  };

  const sendPasswordReset = useCallback(
    async (email: string) => {
      try {
        if (!auth) {
          throw new Error("Firebase wasn't initialized properly");
        }

        await sendPasswordResetEmail(auth, email);
      } catch (err: unknown) {
        let message = "Failed to send password reset email: ";
        if (err instanceof Error) {
          if (err.message.includes("auth/invalid-email")) {
            message += "Invalid email address";
          }

          if (err.message.includes("auth/user-not-found")) {
            message += "We couldn't find a user with this email address";
          }
        }

        throw new Error(message);
      }
    },
    [auth]
  );

  const logout = useCallback(async () => {
    try {
      if (!auth) {
        throw new Error("Firebase wasn't initialized properly");
      }

      await signOut(auth);
    } catch (err: unknown) {
      let message = "Logout failed: ";
      if (err instanceof Error) {
        message += err.message;
      }
      throw new Error(message);
    }
  }, [auth]);

  const reauthenticate = useCallback(
    async (userProvidedPassword: string) => {
      try {
        if (!auth) {
          throw new Error("Firebase auth is undefined");
        }
        if (!auth.currentUser?.email) {
          throw new Error("User isn't logged in");
        }

        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          userProvidedPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      } catch (err: unknown) {
        let message = "Re-authentication failed: ";
        if (err instanceof Error) {
          if (err.message.includes("auth/missing-password")) {
            message += "Please enter your login password";
          }

          if (err.message.includes("auth/wrong-password")) {
            message += "Wrong password. Try again.";
          }

          if (err.message.includes("auth/too-many-requests")) {
            message += "Too many requests. Try again later.";
          }
        }

        throw new Error(message);
      }
    },
    [auth]
  );

  const changePassword = useCallback(
    async (userProvidedPassword: string, newPassword: string) => {
      try {
        if (!auth) {
          throw new Error("Firebase auth is undefined");
        }
        if (!authUser) {
          throw new Error("Please authenticate first: changePassword");
        }

        await reauthenticate(userProvidedPassword);
        await updatePassword(authUser, newPassword);
      } catch (err: unknown) {
        let message = "Password change failed: ";
        if (err instanceof Error) {
          message += err.message;
        }
        throw new Error(message);
      }
    },
    [auth, authUser, reauthenticate]
  );

  const addEmailLoginPassword = useCallback(
    async (newPassword: string) => {
      if (!authUser) return;

      const passwordVerified = authUser.providerData.some(
        (provider) => provider.providerId === "password"
      );
      if (passwordVerified) return;

      try {
        await updatePassword(authUser, newPassword);
      } catch (err: unknown) {
        let message = "Setting password failed: ";
        if (err instanceof Error) {
          message += err.message;
        }
        throw new Error(message);
      }
    },
    [authUser]
  );

  return (
    <FirebaseAuthContext.Provider
      value={{
        authUser,
        isUserVerified,
        signUpWithEmail,
        loginWithEmail,
        signInWithGoogle,
        signInWithApple,
        addEmailLoginPassword,
        sendPasswordReset,
        sendVerification,
        logout,
        reauthenticate,
        changePassword,
        deleteAccount,
      }}
    >
      {!loadingInitial && children}
    </FirebaseAuthContext.Provider>
  );
};
