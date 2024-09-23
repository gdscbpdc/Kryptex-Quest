import CryptoJS from 'crypto-js';
import { sha256 } from 'crypto-hash';

import { Values } from './values';
import { order } from '@/lib/order';
import { db } from './firebase.config';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

export const setEncryptedItem = (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    const encryptedValue = CryptoJS.AES.encrypt(
      stringValue,
      Values.encryptionKey
    ).toString();
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error('Error encrypting and storing data:', error);
  }
};

export const getDecryptedItem = (key) => {
  try {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) {
      return null;
    }
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedValue,
      Values.encryptionKey
    );
    const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const parsedValue = JSON.parse(decryptedValue);
    return parsedValue;
  } catch (error) {
    console.error('Error decrypting and retrieving data:', error);
    return null;
  }
};

export const getAndUpdateTeam = async () => {
  try {
    const localTeam = getDecryptedItem('team');
    const teamDoc = await getDoc(doc(db, 'teams', localTeam.teamLeaderEmail));
    const teamData = teamDoc.data();
    setEncryptedItem('team', teamData);
    return teamData;
  } catch (error) {
    console.error('Error: ', error);
    return null;
  }
};

export async function hashValue(value) {
  const localHash = await sha256(value);
  return localHash;
}

export const isLoggedIn = () => {
  const team = getDecryptedItem('team');
  return team !== null;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

export const updateProgress = async (currentPath) => {
  const team = getDecryptedItem('team');

  await updateDoc(doc(db, 'teams', team.teamLeaderEmail), {
    completedSteps: arrayUnion(currentPath),
    currentStep: order.indexOf(currentPath) + 1,
  });

  setEncryptedItem('team', {
    ...team,
    completedSteps: [...team.completedSteps, currentPath],
    currentStep: order.indexOf(currentPath) + 1,
  });
};
