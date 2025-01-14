import { useContext } from "react";
import { FirebaseAuthContext } from "../context/firebase-auth-context";

export default function useFirebaseAuth() {
  return useContext(FirebaseAuthContext);
}
