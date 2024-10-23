import { QUIZ_FEEDBACK } from './constants';

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getQuizFeedback = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) return QUIZ_FEEDBACK.PERFECT;
  if (percentage >= 90) return QUIZ_FEEDBACK.EXCELLENT;
  if (percentage >= 70) return QUIZ_FEEDBACK.GOOD;
  if (percentage >= 50) return QUIZ_FEEDBACK.FAIR;
  return QUIZ_FEEDBACK.NEEDS_REVIEW;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const validateBookData = (bookData) => {
  const errors = [];
  if (!bookData.title) errors.push('Title is required');
  if (!bookData.author) errors.push('Author is required');
  if (bookData.rating && (bookData.rating < 1 || bookData.rating > 5)) {
    errors.push('Rating must be between 1 and 5');
  }
  return errors;
};