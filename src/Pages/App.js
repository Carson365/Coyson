import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CartProtectedRoute, LoginProtectedRoute } from '../ProtectedRoute.js';
import { booksByGenre, genreIDs as GENRES, GetBookByGenre } from '../Api.js';

import Home from '../Pages/Home.jsx';
import Search from '../Pages/Search.jsx';
import Book from '../Pages/Book.jsx';
import Genre from '../Pages/Genre.jsx';
import Cart from '../Pages/Cart.jsx';
import Login from '../Pages/Login.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const [loadedGenres, setLoadedGenres] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = '#333';

    const loadBooksByGenre = async () => {
      try {
        const loadPromises = GENRES.map(async (genre) => {
          const alreadyLoaded = booksByGenre[genre.id]?.length > 0;
          if (!alreadyLoaded) {
            await GetBookByGenre(genre.id);
          }
          return genre.id;
        });

        const genresLoaded = await Promise.all(loadPromises);
        setLoadedGenres(genresLoaded);
        setLoading(false);
      } catch (err) {
        console.error("Error loading genres:", err);
        setLoading(false);
      }
    };

    loadBooksByGenre();
  }, []);

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading books...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home loadedGenres={loadedGenres} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:bookID" element={<Book />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/login" element={
          <LoginProtectedRoute>
            <Login />
          </LoginProtectedRoute>
        } />
        <Route path="/cart" element={
          <CartProtectedRoute>
            <Cart />
          </CartProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;