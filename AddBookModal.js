import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddBookModal = ({ isOpen, onClose, onAddBook, bookData }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    characters: '',
    series: '',
    rating: '',
    image: null
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: bookData?.title || '',
        author: bookData?.author || '',
        summary: bookData?.summary || '',
        characters: bookData?.characters || '',
        series: bookData?.series || '',
        rating: bookData?.rating || '',
        image: bookData?.image || null,
        id: bookData?.id || null
      });
    }
  }, [isOpen, bookData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include the ID if it exists (for editing)
    const submitData = {
      ...formData,
      id: formData.id || Date.now().toString()
    };
    onAddBook(submitData);
    onClose();
  };

  if (!isOpen) return null;

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
      padding: '24px',
      position: 'relative'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '16px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box'
    },
    textarea: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      minHeight: '100px',
      resize: 'vertical',
      boxSizing: 'border-box'
    },
    imagePreview: {
      width: '100%',
      maxHeight: '200px',
      objectFit: 'cover',
      borderRadius: '6px',
      marginTop: '8px'
    },
    addButton: {
      backgroundColor: '#22d3ee',
      color: 'white',
      padding: '10px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%',
      marginTop: '16px'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px'
    },
    quizLink: {
      color: '#22d3ee',
      textDecoration: 'none',
      fontSize: '14px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>
            {formData.id ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button style={modalStyles.closeButton} onClick={onClose}>
            <X size={24} color="#6b7280" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={modalStyles.form}>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={modalStyles.input}
              required
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              style={modalStyles.input}
              required
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              style={modalStyles.textarea}
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Characters</label>
            <input
              type="text"
              name="characters"
              value={formData.characters}
              onChange={handleChange}
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Series</label>
            <input
              type="text"
              name="series"
              value={formData.series}
              onChange={handleChange}
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              style={modalStyles.input}
            />
          </div>

          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={modalStyles.input}
            />
            {formData.image && (
              <img 
                src={formData.image} 
                alt="Book cover preview" 
                style={modalStyles.imagePreview}
              />
            )}
          </div>

          <button type="submit" style={modalStyles.addButton}>
            {formData.id ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;