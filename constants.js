export const BOOKS_PER_SHELF = 7;
export const MAX_SHELVES_PER_ROW = 7;
export const TOTAL_SHELVES = 35;
export const MAX_ZOOM = 2;
export const MIN_ZOOM = 0.5;
export const ZOOM_STEP = 0.1;

export const QUIZ_FEEDBACK = {
  PERFECT: "Perfect score! You're a master of this book! 🌟",
  EXCELLENT: "Excellent work! You really know your stuff! 🎉",
  GOOD: "Good job! You've got a solid understanding. 👍",
  FAIR: "Not bad! A little more reading might help. 📚",
  NEEDS_REVIEW: "You might want to review this book again. 💪"
};

export const DEFAULT_BOOK_DATA = {
  title: '',
  author: '',
  summary: '',
  characters: '',
  series: '',
  rating: '',
  image: null,
  quiz: []
};