import './Home.css';
import Navbar from '../Components/Navbar';
import BookCarousel from '../Components/Carousels';
import React, { useEffect, useState } from 'react';
import { booksByGenre, genreIDs as GENRES, GetBookByGenre } from '../Api';
import { useUser } from '../UserContext';

let count = 0;

function Home() {
  const [loadedGenres, setLoadedGenres] = useState([]);
  const { setUser } = useUser();

  useEffect(() => {
    document.body.style.backgroundColor = '#333';

    const loadBooksByGenre = async () => {
      for (const genre of GENRES) {
        const alreadyLoaded = booksByGenre[genre.id]?.length > 0;
    
        if (!alreadyLoaded) {
          try {
            await GetBookByGenre(genre.id); 
          } catch (err) {
            console.error(`Error loading ${genre.genre}:`, err);
            continue;
          }
        }
    
        setLoadedGenres(prev =>
          prev.includes(genre.id) ? prev : [...prev, genre.id]
        );
      }
    };
    

    loadBooksByGenre();

    const handleLogin = async () => {
      const userData = {
        name: "Coy",
        email: "coy@example.com",
        role: "member",
        books: [],
      };
      
      setUser(userData);
      
    };
    

    if(count < 1){
      count++;
      handleLogin();
    }
  }, []);

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