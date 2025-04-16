import React, { useEffect, useState } from 'react';
import Navbar from '../Components/HomeNavbar';
import { useParams } from "react-router-dom";
import { TenCards } from '../Components/Card';
import { GetBookByID } from '../BookData';
import './Book.css'

function Book() {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log('Sending book id' + bookID)
    const foundBook = GetBookByID(bookID);
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
            <TenCards genre={book.categories} />
          </div>
        </div>
        <div style={{ width: '66.67%', overflowY: 'auto', padding: '1rem' }}>
          <h2>{book.title}</h2>
          <h4 style={{ fontStyle: 'italic' }}>{book.authors?.[0] || 'Unknown Author'}</h4>
          <p><strong>Genre:</strong> {book.categories}</p>
          <p><strong>Description:</strong></p>
          <p>{book.description}</p>
        </div>
      </div>
    </>
  );
}

export default Book;
