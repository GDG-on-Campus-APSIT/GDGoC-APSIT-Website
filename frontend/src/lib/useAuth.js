import { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Check if it’s a new user
      const isNewUser = firebaseUser.metadata.creationTime === firebaseUser.metadata.lastSignInTime;

      if (isNewUser) {
        // Send user details to backend
        await axios.post('http://localhost:5000/api/users', {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          profilePic: firebaseUser.photoURL,
        });
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return { user, signInWithGoogle, signOutUser };
}
