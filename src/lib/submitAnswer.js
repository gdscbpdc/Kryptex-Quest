'use server';

import sentenceSimilarity from './similarity';

const answersByRoute = {
  '/bio-infomatics': 'codon table',
  '/cybersecurity': 'sherlock',
  '/cross-word':
    '00Q0000000U0000000I00000ZIZZ0Q0000Z00U0000E0SI000KRYPTEX00S0A0L00000ZEK00000Z000',
};

export const submitAnswer = async (answer, route) => {
  try {
    if (answer.trim().toLowerCase() === answersByRoute[route].toLowerCase()) {
      return true;
    } else {
      return { error: 'Incorrect answer. Try again!' };
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    return { error: 'Something went wrong, please try again.' };
  }
};

export const submitAIMLAnswer = async (answer) => {
  const correctAnswers = [
    `Can you describe a concealed door in an ancient woodland, hidden beneath leaves and only accessible to those with a lost token? What secret does it guard?`,
    `Please create a scene featuring a hidden door deep in a timeless forest, obscured by foliage, that only those with a rare emblem can access. What ancient mystery lies behind it?`,
    `Generate a description of a hidden portal within an old forest, covered by fallen leaves, accessible only to those with a forgotten artifact. What truth does it reveal?`,
    `I'd like a narrative about a secret door in a secluded ancient grove, concealed by leaves, that can only be opened by someone holding a unique charm. What centuries-old secrets does it hide?`,
    `Describe a door buried under leaves in a primeval forest, only accessible to those with a lost token. What ancient enigma is waiting to be discovered?`,
    `Kindly generate a description of a hidden door in an ancient forest, accessible solely by possessing a forgotten token. What secret does it conceal?`,
    `Please articulate a narrative featuring a concealed door in a historic woodland, obscured by leaves and available only to those with a rare token.`,
    `Can you provide a depiction of a secret portal within an ancient forest, accessible exclusively by individuals holding a lost artifact? What mystery does it reveal?`,
    `I request a description of a hidden entrance in a timeless grove, veiled by fallen leaves and unlocked only with a unique charm. What ancient truth lies beyond?`,
    `Generate a formal narrative about a concealed door in a primeval forest, obscured by foliage, accessible only to those with a forgotten emblem. What enigma awaits?`,
    `Describe a hidden door deep within an ancient forest, only accessible to those who possess a rare forgotten token, leading to a centuries-old secret.`,
  ];

  try {
    const score = correctAnswers.reduce((score, correctAnswer) => {
      const similarity = sentenceSimilarity(answer, correctAnswer) * 100;

      return Math.max(score, similarity);
    }, 0);

    console.log('Score:', score);

    if (score >= 70) {
      return { correct: true, score: score };
    } else {
      return { correct: false, score: score };
    }
  } catch (error) {
    console.error('Error submitting answer:', error);
    return { error: 'Something went wrong, please try again.' };
  }
};
