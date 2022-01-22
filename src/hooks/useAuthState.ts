import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";

export const useAuthState = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      setLoading(false);
      setUser(user);
    });
    return () => unregisterAuthObserver();
  }, []);

  return {loading, isSignedIn, user};
}