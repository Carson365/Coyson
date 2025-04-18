import './Home.css';
import Navbar from '../Components/Navbar';
import BookCarousel from '../Components/Carousels';
import React, { useEffect, useState } from 'react';
import { fetchBooksByGenre, booksByGenre, allGenres as GENRES } from '../Api';

function Home() {
  const [loadedGenres, setLoadedGenres] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = '#333';


    const loadBooksByGenre = async () => {
      for (const genre of GENRES) {
        const alreadyLoaded = booksByGenre[genre]?.length > 0;
        if (!alreadyLoaded) {
          try {
            await fetchBooksByGenre(genre, 64);
          } catch (err) {
            console.error(`Error loading ${genre}:`, err);
            continue;
          }
        }

        setLoadedGenres(prev =>
          prev.includes(genre) ? prev : [...prev, genre]
        );
      }
    };

    loadBooksByGenre();
  
  }, []);

  return (
    <div className="App">
      <Navbar user={'Guest'} />
      <div id="body">
        {GENRES.map(genre =>
          loadedGenres.includes(genre) ? (
            <BookCarousel key={genre} genre={genre} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default Home;