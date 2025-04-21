import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import BooksByGenre from '../Components/BooksByGenre';
import { genreIDs } from '../Api';
import './Genre.css';

function Genre() {
  const { genre } = useParams();
  
  const cleanGenre = genre.startsWith(':') ? genre.slice(1) : genre;
  const decodedGenre = decodeURIComponent(cleanGenre);

  console.log(decodedGenre);
  return (
    <div>
      <Navbar />
      <div id="body">
        {decodedGenre ? (
          <BooksByGenre genre={decodedGenre} />
        ) : (
          <h2 className="results-title">Genre not found: {decodedGenre}</h2>
        )}
      </div>
    </div>
  );
}

export default Genre;