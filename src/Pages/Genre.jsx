import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/RegularNavbar';
import BooksByGenre from '../Components/BooksByGenre';
import { genreIDs } from '../Api';
import './Genre.css';

function Genre() {
  const { genre } = useParams();
  
  const cleanGenre = genre.startsWith(':') ? genre.slice(1) : genre;
  const decodedGenre = decodeURIComponent(cleanGenre);

  const matchedGenre = genreIDs.find(
    (g) => g.genre.toLowerCase() === decodedGenre.toLowerCase()
  );

  const genreID = matchedGenre?.id;

  return (
    <div>
      <Navbar />
      <div id="body">
        {genreID ? (
          <BooksByGenre genreID={genreID} />
        ) : (
          <h2 className="results-title">Genre not found: {decodedGenre}</h2>
        )}
      </div>
    </div>
  );
}

export default Genre;