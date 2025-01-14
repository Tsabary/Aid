import { useContext } from "react";
import { FirebaseContext } from "../context/firebase-context";

export default function useFirebase() {
  return useContext(FirebaseContext);
}
