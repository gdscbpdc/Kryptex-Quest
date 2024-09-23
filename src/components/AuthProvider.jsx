'use client';

import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { createContext, useContext, useEffect, useState } from 'react';

import Loading from './Loading';
import { order } from '@/lib/order';
import { auth, db } from '@/services/firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    setCurrentUser(auth.currentUser || undefined);
  }, [auth.currentUser]);

  useEffect(() => {
    if (currentUser === null) {
      setLoadingUser(true);
    } else {
      setLoadingUser(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setCurrentUser(user);
          const teamQuery = query(
            collection(db, 'teams'),
            where('teamLeaderEmail', '==', user.email)
          );
          const teamDocs = await getDocs(teamQuery);
          const teamDoc = teamDocs.docs[0];
          setTeam(teamDoc.data());
        } else {
          setTeam(null);
          setCurrentUser(undefined);
        }
      } catch (error) {
        setTeam(null);
        setCurrentUser(undefined);
        console.error('Error: ', error);
      }
    });
    return () => unsubscribe();
  }, []);

  // TODO call this when team is updated
  const updateLocalTeam = async () => {
    if (!currentUser?.uid) {
      return;
    }
    console.log('Attempting to update local team');
    const teamQuery = query(
      collection(db, 'teams'),
      where('teamLeaderEmail', '==', currentUser?.email)
    );
    const teamDocs = await getDocs(teamQuery);
    const teamDoc = teamDocs.docs[0];
    if (!teamDoc) return;
    setTeam(teamDoc.data());
  };

  const loginWithEmailAndPassword = async (email, password) => {
    setLoadingUser(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error: ', error.code);
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/invalid-credential'
      ) {
        alert('Invalid credentials');
      } else {
        alert('Login failed');
      }
    } finally {
      setLoadingUser(false);
    }
  };

  const registerWithEmailAndPassword = async (
    teamLeaderEmail,
    password,
    teamName,
    teamMembers
  ) => {
    setLoadingUser(true);
    try {
      await createUserWithEmailAndPassword(auth, teamLeaderEmail, password);

      await addDoc(collection(db, 'teams'), {
        teamName,
        teamLeaderEmail,
        teamMembers,
        createdAt: new Date(),
      });

      router.replace(order[0]);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/email-already-in-use'
      ) {
        alert('Email already in use');
      } else {
        alert('Registration failed');
      }
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = async () => {
    setLoadingUser(true);
    try {
      await signOut(auth);

      router.replace('/');
    } catch (error) {
      alert('Logout failed');
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
            team,
            currentUser,
            loginWithEmailAndPassword,
            registerWithEmailAndPassword,
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
