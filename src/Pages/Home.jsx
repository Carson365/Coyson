import './Home.css';
import Navbar from '../Components/HomeNavbar';
import BookCarousel from '../Components/Carousels';
import React, { useEffect, useState } from 'react';
import { fetchAllGenres, booksByGenre } from '../Api';

function Home() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#333';

    const loadGenres = async () => {
      const isAlreadyPopulated = Object.keys(booksByGenre).length > 0 &&
        Object.values(booksByGenre).every(arr => arr.length > 0);

      if (!isAlreadyPopulated) {
        try {
          await fetchAllGenres();
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      }

      setDataLoaded(true);
    };

    loadGenres();
  }, []);

  return (
    <div className="App">
      <Navbar user={'Guest'} />
      <div id="body">
        <BookCarousel genre={"Fiction"} />
        <BookCarousel genre={"Mystery"} />
        <BookCarousel genre={"Biography"} />
        <BookCarousel genre={"Fantasy"} />
        <BookCarousel genre={"AutoBiography"} />
        <BookCarousel genre={"Nonfiction"} />
        <BookCarousel genre={"Thriller"} />
        <BookCarousel genre={"Science Fiction"} />
        <BookCarousel genre={"Poetry"} />
        <BookCarousel genre={"Novel"} />
      </div>
    </div>
  );
}

export default Home;
