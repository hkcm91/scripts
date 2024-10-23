import React, { useState, useEffect } from 'react';
import { X, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { getQuizFeedback } from '../utils/helpers';

const QuizModal = ({ isOpen, onClose, quiz = [] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setScore(0);
      setAnswers([]);
      setQuizComplete(false);
    }
  }, [isOpen]);

  if (!isOpen || quiz.length === 0) return null;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quiz[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);

    setAnswers([...answers, {
      question: quiz[currentQuestion].question,
      selectedAnswer,
      correct: isCorrect
    }]);

    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[32rem] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quiz</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {!quizComplete ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Question {currentQuestion + 1} of {quiz.length}
              </h3>
              <span className="text-sm text-gray-500">
                Score: {score}/{currentQuestion}
              </span>
            </div>

            <p className="text-lg">{quiz[currentQuestion].question}</p>

            <div className="space-y-3">
              {quiz[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-3 text-left rounded-lg transition-colors ${
                    selectedAnswer === index
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {answer}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
                selectedAnswer === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-cyan-500 text-white hover:bg-cyan-600'
              }`}
            >
              <span>Next Question</span>
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <Award size={48} className="mx-auto mb-4 text-cyan-500" />
              <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
              <p className="text-xl mb-2">
                Your score: {score} out of {quiz.length}
                ({Math.round((score / quiz.length) * 100)}%)
              </p>
              <p className="text-gray-600">
                {getQuizFeedback(score, quiz.length)}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Review Your Answers:</h4>
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    answer.correct ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <p className="font-medium">{quiz[index].question}</p>
                  <p className={answer.correct ? 'text-green-600' : 'text-red-600'}>
                    Your answer: {quiz[index].answers[answer.selectedAnswer]}
                  </p>
                  {!answer.correct && (
                    <p className="text-green-600">
                      Correct answer: {quiz[index].answers[quiz[index].correctAnswer]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleRetry}
                className="flex-1 bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 flex items-center justify-center space-x-2"
              >
                <RotateCcw size={20} />
                <span>Try Again</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;