import React, { memo } from 'react';

const Book = memo(({ book, onClick }) => {
  const bookStyles = {
    container: {
      width: '120px',
      height: '160px',
      backgroundColor: '#22D3EE',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '4px',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    inner: {
      width: '100px',
      height: '140px',
      backgroundColor: book?.image ? 'transparent' : '#A5F3FC',
      borderRadius: book?.image ? '4px' : '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    },
    circle: {
      width: '40px',
      height: '40px',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    plus: {
      color: '#22D3EE',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '4px'
    }
  };

  return (
    <div style={bookStyles.container} onClick={() => onClick(book)}>
      <div style={bookStyles.inner}>
        {book?.image ? (
          <img src={book.image} alt={book.title} style={bookStyles.image} />
        ) : (
          <div style={bookStyles.circle}>
            <span style={bookStyles.plus}>+</span>
          </div>
        )}
      </div>
    </div>
  );
});

const Shelf = memo(({ books = [], onBookClick }) => {
  const shelfStyle = {
    display: 'flex',
    gap: '8px',
    padding: '8px',
    margin: '4px 0',
    flexWrap: 'nowrap'
  };

  return (
    <div style={shelfStyle}>
      {Array(7).fill(null).map((_, index) => (
        <Book 
          key={index}
          book={books[index]}
          onClick={onBookClick}
        />
      ))}
    </div>
  );
});

export { Book, Shelf };