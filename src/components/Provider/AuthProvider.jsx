import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";

export const authContext = createContext(null);

const AuthProvider = ({ children }) => {
  // google auth provider
  const googleProvider = new GoogleAuthProvider();

  // set state for manage users guard
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // user creation
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sing in with email and password

  const singInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   sign out user functionality
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   google authentication

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    singInUser,
    signOutUser,
    signInWithGoogle,
  };

  //   manage users for guard
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current user", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe(); // clean function (unmount func)
    };
  }, []);

  //   manage users for guard (we should do operation in an useEffect hook)

  //   onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       console.log("currently logged user", currentUser);
  //       setUser(currentUser);
  //     } else {
  //       console.log("no user logged in yet");
  //       setUser(null);
  //     }
  //   });

  return (
    <authContext.Provider value={authInfo}>
      {/* 
    Main part who will have access to this context
     */}
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

/**
 * 1: create context with null as default
 * 2: create Provider
 * 3: set a default value with something (authInfo)
 * 4: use the authProvider in the main.jsx
 * 5: access the children inside the authProvider in the main.jsx
 * 6: export AuthContext
 * **/
