import './App.css';
import Navbar from './Navbar.jsx'
import BookCarousel from './Carousels.jsx';
import React, { useEffect } from 'react';

function App() {
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
      </div>
    </div>
  );
}

export default App;