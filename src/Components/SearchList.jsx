import { booksByGenre } from '../Api.js';
import Card from './Card.jsx';
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import '../Pages/Search.css'; 

const ITEMS_PER_PAGE = 20;

const SearchList = ({ input }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const books = flattenBooksByGenre();

    setCurrentPage(1);

    if (!input || input.trim() === '') {
      const sortedBooks = [...books].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setFilteredBooks(sortedBooks);
      setShowAll(true);
      return;
    }

    const options = {
      keys: ['title', 'categories', 'authors'],
      threshold: 0.3,
      includeScore: true,
    };

    const fuse = new Fuse(books, options);
    const result = fuse.search(input);

    const sortedBooks = result
      .map(({ item }) => item)
      .sort((a, b) => {
        return result.find(r => r.item === a).score - result.find(r => r.item === b).score;
      });

    if (sortedBooks.length === 0) {
      const sortedAll = [...books].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setFilteredBooks(sortedAll);
      setShowAll(true);
    } else {
      setFilteredBooks(sortedBooks);
      setShowAll(false);
    }
  }, [input]);

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

  return (
    <div id="body" className="search-results-container">
      {input && !showAll && (
        <h2 className="results-title">Showing Results For "{input}"</h2>
      )}
      {showAll && (
        <h2 className="results-title">Showing All Books A-Z</h2>
      )}

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

const flattenBooksByGenre = () => {
  return Object.values(booksByGenre).flat();
};

export default SearchList;