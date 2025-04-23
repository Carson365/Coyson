import './Home.css';
import Navbar from '../Components/Navbar';
import BookCarousel from '../Components/Carousels';
import React from 'react';
import { genreIDs as GENRES } from '../Api';

function Home({ loadedGenres }) {
  return (
    <div className="App">
      <Navbar />
      <div id="body">
        {GENRES.map(genre =>
          loadedGenres.includes(genre.id) ? (
            <BookCarousel key={genre.id} genre={genre.id} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Home;