import CryptoJS from 'crypto-js';
// import { sha256 } from 'crypto-hash';
import { sha256 } from 'js-sha256';

import { qrValues, Values } from './values';
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

export const hashValue = (value) => {
  const localHash = sha256(value);
  return localHash;
};
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
    //currentStep: order.indexOf(currentPath) + 1,
  });

  setEncryptedItem('team', {
    ...team,
    completedSteps: [...(team?.completedSteps ?? []), currentPath],
    //currentStep: order.indexOf(currentPath) + 1,
  });
};

const getIndexByHashedId = (hashedId) => {
  const path = Object.keys(qrValues).find((key) => qrValues[key] === hashedId);
  return path ? order.indexOf(path) : -1;
};

export const scanAndUpdateProgress = async (dataObject) => {
  const hashedId = dataObject[0]?.rawValue;
  const team = await getAndUpdateTeam();

  const currentStepUndefined =
    team.currentStep === undefined || team.currentStep === null;

  const currentStep = team?.currentStep ?? 0;

  const updatedStep = getIndexByHashedId(hashedId);

  const stepDifference = updatedStep - currentStep;

  // If the updated step is already completed
  if (updatedStep < currentStep) {
    console.error('You have already completed this question');
    throw new Error('You have already completed this question');
  }

  // If the current step is not completed
  if (currentStep !== 0 && !team.completedSteps?.includes(order[currentStep])) {
    console.error('Complete the current question first');
    throw new Error('Complete the current question first');
  }

  // To handle first puzzle scanning when nothing is done yet ie current step is undefined
  if (currentStepUndefined && updatedStep !== 0) {
    console.error("Don't Cheat, find the QR in order");
    throw new Error("Don't Cheat, find the QR in order");
  }

  // Current step is defined and updated step is not next step
  if (!currentStepUndefined && stepDifference !== 1) {
    console.error("Don't Cheat, find the QR in order");
    throw new Error("Don't Cheat, find the QR in order");
  }

  await updateDoc(doc(db, 'teams', team.teamLeaderEmail), {
    currentStep: updatedStep,
  });

  setEncryptedItem('team', {
    ...team,
    currentStep: updatedStep,
  });

  console.log('Updated Step: ', updatedStep);

  return updatedStep;
};
