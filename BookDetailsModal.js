import React, { useState, useEffect, useCallback } from 'react';
import { X, PlusCircle, Trash } from 'lucide-react';

const AddBookModal = ({ isOpen, onClose, onAddBook, bookData }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    characters: '',
    series: '',
    rating: '',
    image: null,
    quiz: [],
    ...bookData
  });

  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...bookData });
      setShowQuiz(false);
    }
  }, [isOpen, bookData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAddQuestion = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      quiz: [...prev.quiz, { question: '', answers: ['', '', '', ''], correctAnswer: 0 }]
    }));
  }, []);

  const handleQuestionChange = useCallback((index, field, value) => {
    setFormData(prev => {
      const newQuiz = [...prev.quiz];
      newQuiz[index] = { ...newQuiz[index], [field]: value };
      return { ...prev, quiz: newQuiz };
    });
  }, []);

  const handleRemoveQuestion = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      quiz: prev.quiz.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onAddBook(formData);
  }, [formData, onAddBook]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{bookData.id ? 'Edit Book' : 'Add Book'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['Title', 'Author', 'Summary', 'Characters', 'Series', 'Rating'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{field}</label>
              <input
                type={field === 'Rating' ? 'number' : 'text'}
                name={field.toLowerCase()}
                value={formData[field.toLowerCase()]}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required={field === 'Title' || field === 'Author'}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowQuiz(!showQuiz)}
              className="text-blue-600 hover:text-blue-800"
            >
              {showQuiz ? 'Hide Quiz' : 'Show Quiz'}
            </button>
          </div>
          {showQuiz && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quiz Questions</h3>
              {formData.quiz.map((question, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    placeholder="Question"
                    className="w-full mb-2 p-2 border rounded"
                  />
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => handleQuestionChange(index, 'answers', [
                          ...question.answers.slice(0, answerIndex),
                          e.target.value,
                          ...question.answers.slice(answerIndex + 1)
                        ])}
                        placeholder={`Answer ${answerIndex + 1}`}
                        className="flex-grow p-2 border rounded mr-2"
                      />
                      <input
                        type="radio"
                        name={`correct-answer-${index}`}
                        checked={question.correctAnswer === answerIndex}
                        onChange={() => handleQuestionChange(index, 'correctAnswer', answerIndex)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <PlusCircle size={16} className="mr-1" /> Add Question
              </button>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {bookData.id ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;