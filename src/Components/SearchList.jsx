import { booksByGenre } from '../Api.js';
import Card from './Card.jsx';
import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import '../Pages/Search.css';

const SearchList = ({ input }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const books = flattenBooksByGenre();

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
      })
      .slice(0, 20);

    setFilteredBooks(sortedBooks);
  }, [input]);

  return (
    <div className="search-results-container">
      {input && <h2 className="results-title">Showing Results For "{input}"</h2>}
      <div className="book-grid">
        {filteredBooks.map((book, index) => (
          <div key={index} className="book-card-wrapper">
            <Card book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

const flattenBooksByGenre = () => {
  return Object.values(booksByGenre).flat();
};

export default SearchList;