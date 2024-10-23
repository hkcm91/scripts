import React, { useState, useCallback, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Book, Shelf } from './BookComponents';
import AddBookModal from './AddBookModal';
import BookDetailsModal from './BookDetailsModal';
import QuizModal from './QuizModal';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: 'white',
  padding: '20px'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  maxWidth: '1200px',
  marginBottom: '20px'
};

const buttonStyle = {
  padding: '8px',
  marginLeft: '8px',
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer'
};

const shelvesContainerStyle = {
  width: '100%',
  maxWidth: '1200px',
  height: '85vh',
  overflow: 'auto',
  backgroundColor: 'white',
  padding: '20px'
};

const DigitalBookshelf = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [shelves, setShelves] = useState(() => {
    const initialShelves = {};
    for (let i = 0; i < 35; i++) {
      initialShelves[i] = Array(7).fill(null);
    }
    return initialShelves;
  });

  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookDetailsModalOpen, setIsBookDetailsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleZoom = useCallback((delta) => {
    setZoomLevel((prevZoom) => Math.max(0.5, Math.min(2, prevZoom + delta)));
  }, []);

  const handleBookClick = useCallback((book, action = 'add') => {
    setSelectedBook(book);
    if (!book || action === 'add') {
      setIsAddBookModalOpen(true);
    } else if (action === 'details') {
      setIsBookDetailsModalOpen(true);
    } else if (action === 'quiz') {
      setIsQuizModalOpen(true);
    }
  }, []);

  const handleAddOrUpdateBook = useCallback((bookData) => {
    setShelves((prevShelves) => {
      const newShelves = { ...prevShelves };
      const bookId = bookData.id || Date.now().toString();
      const updatedBookData = { ...bookData, id: bookId };
      
      // If updating an existing book
      if (bookData.id) {
        for (let shelfId in newShelves) {
          const bookIndex = newShelves[shelfId].findIndex(book => book?.id === bookData.id);
          if (bookIndex !== -1) {
            newShelves[shelfId] = [
              ...newShelves[shelfId].slice(0, bookIndex),
              updatedBookData,
              ...newShelves[shelfId].slice(bookIndex + 1)
            ];
            return newShelves;
          }
        }
      }
      
      // If adding a new book, find first empty slot
      for (let shelfId in newShelves) {
        const emptyIndex = newShelves[shelfId].findIndex(book => !book);
        if (emptyIndex !== -1) {
          newShelves[shelfId] = [
            ...newShelves[shelfId].slice(0, emptyIndex),
            updatedBookData,
            ...newShelves[shelfId].slice(emptyIndex + 1)
          ];
          return newShelves;
        }
      }
      
      return newShelves;
    });

    setIsAddBookModalOpen(false);
    setSelectedBook(null);
  }, []);

  // Save to localStorage whenever shelves change
  React.useEffect(() => {
    localStorage.setItem('bookshelfData', JSON.stringify(shelves));
  }, [shelves]);

  // Load from localStorage on initial render
  React.useEffect(() => {
    const savedData = localStorage.getItem('bookshelfData');
    if (savedData) {
      setShelves(JSON.parse(savedData));
    }
  }, []);

  const renderShelves = useMemo(() => {
    return Object.entries(shelves).map(([shelfId, books]) => (
      <Shelf 
        key={shelfId} 
        books={books}
        onBookClick={handleBookClick}
      />
    ));
  }, [shelves, handleBookClick]);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button 
          onClick={() => handleZoom(-0.1)} 
          style={buttonStyle}
          aria-label="Zoom out"
        >
          <Search size={20} />
        </button>
        <button 
          onClick={() => handleZoom(0.1)} 
          style={buttonStyle}
          aria-label="Zoom in"
        >
          <Search size={24} />
        </button>
      </div>

      <div style={shelvesContainerStyle}>
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {renderShelves}
        </div>
      </div>

      <AddBookModal 
        isOpen={isAddBookModalOpen}
        onClose={() => {
          setIsAddBookModalOpen(false);
          setSelectedBook(null);
        }}
        onAddBook={handleAddOrUpdateBook}
        bookData={selectedBook || {}}
      />

      <BookDetailsModal
        isOpen={isBookDetailsModalOpen}
        onClose={() => {
          setIsBookDetailsModalOpen(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        onStartQuiz={() => {
          setIsBookDetailsModalOpen(false);
          setIsQuizModalOpen(true);
        }}
      />

      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => {
          setIsQuizModalOpen(false);
          setSelectedBook(null);
        }}
        quiz={selectedBook?.quiz}
      />
    </div>
  );
};

export default DigitalBookshelf;