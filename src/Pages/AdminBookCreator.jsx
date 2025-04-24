import React, { useState } from 'react';
import AdminSidebar from '../Components/AdminSideBar.jsx';
import Card from '../Components/Card.jsx';
import { PutBookInDB, getIdByGenre } from '../Api.js';

function AdminBookCreator() {
  const [book, setBook] = useState({
    title: '',
    subtitle: '',
    authors: '',
    publisher: '',
    description: '',
    pageCount: 0,
    categories: '',
    rating: 0,
    maturityRating: '',
    image: '',
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleOnClick = async () => {
    if (book.categories.length > 0) {
      book.genreID = getIdByGenre(book.categories);
    }
  
    const result = await PutBookInDB(book);
  
    if (result) {
      setBook({
        title: '',
        subtitle: '',
        authors: '',
        publisher: '',
        description: '',
        pageCount: 0,
        categories: '',
        rating: 0,
        maturityRating: '',
        image: '',
        price: 0,
      });
    }
  };
  

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#333', color: 'white' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px' }}>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
            <div
              style={{
                flex: 1,
                paddingRight: '20px',
                height: '100vh',
                overflowY: 'auto',
              }}
            >
              <h2>Book Creation Form</h2>
              <form>
                <div style={{ marginBottom: '15px' }}>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Subtitle:</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={book.subtitle}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Authors:</label>
                  <input
                    type="text"
                    name="authors"
                    value={book.authors}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Publisher:</label>
                  <input
                    type="text"
                    name="publisher"
                    value={book.publisher}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={book.description}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      maxWidth: '800px',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      height: '100px',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Page Count:</label>
                  <input
                    type="number"
                    name="pageCount"
                    value={book.pageCount}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Categories:</label>
                  <input
                    type="text"
                    name="categories"
                    value={book.categories}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Rating:</label>
                  <input
                    type="number"
                    name="rating"
                    value={book.rating}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Maturity Rating:</label>
                  <input
                    type="number"
                    name="maturityRating"
                    value={book.maturityRating}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={book.image}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={book.price}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '5px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
              </form>
            </div>

            <div style={{ width: '1px', backgroundColor: '#fff', margin: '0 20px' }}></div>

            <div
              style={{
                flex: 1,
                height: '100vh',
                overflowY: 'auto',
              }}
            >
              <h2 className="book-title">{book?.title || 'Unavailable'}</h2>
              <h4 className="book-author" style={{ fontStyle: 'italic' }}>
                {book?.authors || 'Unavailable'}
              </h4>
              <p className="book-genre">
                <strong>Genre:</strong> {book?.categories || 'Unavailable'}
              </p>
              <p className="book-publisher">
                <strong>Publisher:</strong> {book?.publisher || 'Unavailable'}
              </p>
              <p className="book-pageCount">
                <strong>Page Count:</strong> {book?.pageCount || 'Unavailable'}
              </p>
              <p className="book-rating">
                <strong>Rating:</strong> {book?.rating || 'Unavailable'}
              </p>
              <p className="book-maturityRating">
                <strong>Maturity Rating:</strong> {book?.maturityRating || 'Unavailable'}
              </p>
              <div className="book-description">
                <strong>Description:</strong>
                <p>{book?.description || 'Unavailable'}</p>
              </div>
              <div className="book-subtitle" style={{ marginTop: '20px' }}>
                <strong>Subtitle:</strong>
                <p>{book?.subtitle || 'Unavailable'}</p>
              </div>
              <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px' }}>
                <Card book={book} type={"none"} />
              </div>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                  onClick={handleOnClick}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Create Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBookCreator;