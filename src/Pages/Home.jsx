import './Home.css';
import Navbar from '../Components/HomeNavbar';
import BookCarousel from '../Components/Carousels';
import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.body.style.backgroundColor = '#333';
  })
  return (
    <div className="App">
      <Navbar user={'Coy'}/>
      <div id="body">
        <BookCarousel genre={"Fiction"}/>
        <BookCarousel genre={"Mystery"}/>
        <BookCarousel genre={"Biography"}/>
        <BookCarousel genre={"Fantasy"}/>
        <BookCarousel genre={"AutoBiography"}/>
        <BookCarousel genre={"Nonfiction"}/>
        <BookCarousel genre={"Thriller"}/>
        <BookCarousel genre={"Science Fiction"}/>
        <BookCarousel genre={"Poetry"}/>
        <BookCarousel genre={"Novel"}/>
      </div>
    </div>
  );
}

export default Home;