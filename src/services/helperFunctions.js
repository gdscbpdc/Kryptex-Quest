import CryptoJS from 'crypto-js';
import { sha256 } from 'js-sha256';
// import { sha256 } from 'crypto-hash';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

import { order } from '@/lib/order';
import { db } from './firebase.config';
import { qrValues, Values } from './values';

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

  const updatedStep = getIndexByHashedId(hashedId);

  if (updatedStep === 6) {
    await updateProgress('/qr-game');
  }

  const team = await getAndUpdateTeam();

  const currentStepUndefined =
    team.currentStep === undefined || team.currentStep === null;

  const currentStep = team.currentStep;

  const stepDifference = updatedStep - currentStep;

  console.log('Current Step: ', currentStep);
  console.log('Updated Step: ', updatedStep);
  console.log('Step Difference: ', stepDifference);

  // If the updated step is already completed
  if (team.completedSteps?.includes(order[updatedStep])) {
    console.error('You have already completed this question');
    throw new Error('You have already completed this question');
  }

  // If the current step is not completed
  if (
    currentStep !== -1 &&
    !team.completedSteps?.includes(order[currentStep])
  ) {
    console.error('Complete the current question first');
    throw new Error('Complete the current question first');
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

  // when the user scans the first QR code (/bio-infomatics), the timer should start
  if (updatedStep === 0) {
    startTimer();
  }

  console.log('Updated Step: ', updatedStep);

  return updatedStep;
};

export const startTimer = async () => {
  const team = getDecryptedItem('team');

  const startTime = new Date().toISOString();

  await updateDoc(doc(db, 'teams', team.teamLeaderEmail), {
    startTime: startTime,
  });

  setEncryptedItem('team', {
    ...team,
    startTime: startTime,
  });
};

export const getStartTime = () => {
  const team = getDecryptedItem('team');
  return team.startTime;
};

export const getElapsedTime = () => {
  const team = getDecryptedItem('team');

  if (!team.elapsedTime) {
    console.log('local');
    const currentTime = new Date().toISOString();
    const elapsedTime = formatTime(
      Math.floor((new Date(currentTime) - new Date(team.startTime)) / 1000)
    );

    console.log('db');
    return elapsedTime;
  }

  return team.elapsedTime;
};

export const endTimer = async () => {
  const team = getDecryptedItem('team');

  const endTime = new Date().toISOString();

  const elapsedTime = formatTime(
    Math.floor((new Date(endTime) - new Date(team.startTime)) / 1000)
  );

  await updateDoc(doc(db, 'teams', team.teamLeaderEmail), {
    endTime: endTime,
    elapsedTime: elapsedTime,
  });

  setEncryptedItem('team', {
    ...team,
    endTime: endTime,
    elapsedTime: elapsedTime,
  });
};

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(secs).padStart(2, '0')}`;
};
