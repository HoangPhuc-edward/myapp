import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const handleLogin = (email, password, func) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log("User signed in:", userCredential.user);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      func();
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      alert("Đăng nhập thất bại");
    });
};

const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCdZ2nnbaGy5OnTXmdHQZILxRrW4Z_Q-7o",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    );

    const data = await response.json();
    if (data.users) return data.users[0];
  } catch (error) {
    console.error("Error verifying token:", error);
  }

  return null;
};

const registerUser = async (auth, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      console.log("User registered:", userCredential.user);
    })
    .catch((error) => {
      throw error;
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("token");
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
};

export { handleLogin, registerUser, getUser, logout };
