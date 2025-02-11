import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
};

const registerUser = async (auth, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User registered:", userCredential.user);
    })
    .catch((error) => {
      throw error;
    });
};

export { handleLogin, registerUser };
