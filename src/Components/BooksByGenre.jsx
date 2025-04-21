import { booksByGenre, genreIDs } from '../Api.js';
import Card from './Card.jsx';
import React, { useState, useEffect } from 'react';
import '../Pages/Search.css';

const ITEMS_PER_PAGE = 20;

const BooksByGenre = ({ genre }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (genre) {
      const genreID = parseInt(genre);

      const genreBooks = booksByGenre[genreID] || [];

      const filteredByGenreID = genreBooks.filter(book => book.genreID === genreID);

      console.log(filteredByGenreID);

      const sortedBooks = filteredByGenreID.sort((a, b) => a.title.localeCompare(b.title));

      setFilteredBooks(sortedBooks);
      setCurrentPage(1);
    } else {
      setFilteredBooks([]);
    }
  }, [genre]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const genreID = parseInt(genre);
  const genreName = genreIDs.find(g => g.id === genreID)?.genre || "Genre not found";

  return (
    <div id="body" className="search-results-container">
      <h2 className="results-title">Showing {genreName} A-Z</h2>

      <div className="book-grid">
        {currentBooks.map((book, index) => (
          <div key={index} className="book-card-wrapper">
            <Card book={book} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <div className="pagination-buttons">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          <div className="pagination-page">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksByGenre;
