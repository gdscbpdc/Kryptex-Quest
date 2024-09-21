'use client';

import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { addDoc, collection } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import Loading from './Loading';
import { auth } from '@/services/firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(undefined);
        }
      } catch (error) {
        console.error(error);
        console.error(error);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      setLoadingUser(true);
    } else {
      setLoadingUser(false);
    }
  }, [currentUser]);

  const loginWithEmailAndPassword = async (email, password) => {
    setLoadingUser(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/invalid-credential'
      ) {
        console.error('Invalid Credentials');
        console.error('Invalid Credentials: ', error);
      } else {
        console.error('Login failed');
        console.error(error);
      }
    } finally {
      setLoadingUser(false);
    }
  };

  const registerWithEmailAndPassword = async (email, password, teamName) => {
    setLoadingUser(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, 'teams'), {
        teamName,
        teamLeaderEmail,
        teamMembers,
        step: 1,
        createdAt: new Date(),
      });
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/email-already-in-use'
      ) {
        console.error('Email already in use');
        console.error('Email already in use');
      } else {
        console.error('Registration failed');
        console.error(error);
      }
    } finally {
      setLoadingUser(false);
    }
  };

  const getStep = async () => {
    try {
      const docRef = doc(db, 'teams', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.step;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    setLoadingUser(true);
    try {
      await signOut(auth);
      console.log('Logout successful');
      router.replace('/');
    } catch (error) {
      console.error('Logout failed');
      console.error(error);
    } finally {
      setLoadingUser(false);
    }
  };

  return (
    <>
      {loadingUser ? (
        <Loading />
      ) : (
        <AuthContext.Provider
          value={{
            currentUser,
            loginWithEmailAndPassword,
            registerWithEmailAndPassword,
            getStep,
            logout,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
