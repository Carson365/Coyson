import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Card from '../Components/Card';
import { useParams } from "react-router-dom";
import { TenCards } from '../Components/Card';
import { GetBookByID } from '../BookData.js';
import './Book.css'

function Book() {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const cleanID = bookID.startsWith(':') ? bookID.slice(1) : bookID;
    const foundBook = GetBookByID(cleanID);
    setBook(foundBook);
  }, [bookID]);

  if (!book) {
    return (
      <>
        <Navbar use="Guest" />
        <div style={{ padding: '2rem' }}>Loading book data...</div>
      </>
    );
  }

  return (
    <>
      <Navbar use="Guest" />
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }} id="body">
        <div style={{ width: '33.33%', overflowY: 'auto' }}>
          <div style={{ height: '100%', padding: '1rem' }}>
            <h3 id="CardTitle">More {book.categories}</h3>
            <TenCards genre={book.genreID} />
          </div>
        </div>
        <div className="book-details-container">
      <h2 className="book-title">{book?.title || "Unavailable"}</h2>
      <h4 className="book-author" style={{ fontStyle: 'italic' }}>
        {book?.authors || 'Unavailable'}
      </h4>
      <p className="book-genre">
        <strong>Genre:</strong> {book?.categories || 'Unavailable'}
      </p>
      <p className="book-description">
        <strong>Description:</strong>
      </p>
      <p>{book?.description || 'Unavailable'}</p>
      <p className="book-publisher">
        <strong>Publisher:</strong> {book?.publisher || 'Unavailable'}
      </p>
      <p className="book-pageCount">
        <strong>Page Count:</strong> {book?.pageCount || 'Unavailable'}
      </p>
      <p className="book-rating">
        <strong>Rating:</strong> {book?.averageRating || 'Unavailable'}
      </p>
      <p className="book-maturityRating">
        <strong>Maturity Rating:</strong> {book?.maturityRating || 'Unavailable'}
      </p>
    </div>
    <div className="selected-book">
      <Card book={book} type = {"addToCart"}/>
    </div>
      </div>
    </>
  );
}

export default Book;
