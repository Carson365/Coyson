import React, { useEffect, useState, useRef } from 'react';
import { booksByGenre } from '../Api';
import Card from './Card';

const BookCarousel = ({ genre }) => {
  const [books, setBooks] = useState([]);
  const [booksPerPage, setBooksPerPage] = useState(4);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setBooksPerPage(1);
      } else if (window.innerWidth < 768) {
        setBooksPerPage(2);
      } else if (window.innerWidth < 992) {
        setBooksPerPage(3);
      } else {
        setBooksPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const genreBooks = booksByGenre[genre] || [];
    setBooks(genreBooks.slice(0, 20));
  }, [genre, booksByGenre[genre]?.length]);

  const chunkBooks = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const bookChunks = chunkBooks(books, booksPerPage);
  const totalSlides = bookChunks.length;

  useEffect(() => {
    const carouselEl = carouselRef.current;
    if (!carouselEl) return;

    const handleSlide = (e) => {
      setActiveIndex(e.to);
    };

    carouselEl.addEventListener('slide.bs.carousel', handleSlide);
    return () => carouselEl.removeEventListener('slide.bs.carousel', handleSlide);
  }, []);

  return (
    <div className="container mt-5">
      <div className="carousel-header d-flex justify-content-between align-items-center mb-2">
        <h3 className="carousel-title" id="carTitle">{genre}</h3>
        <a href={`/#/genre/:${encodeURIComponent(genre)}`} className="see-all-link">
          See All
        </a>
      </div>

      <div
        id={`bookCarousel-${genre}`}
        className="carousel slide"
        data-bs-ride="false"
        ref={carouselRef}
      >
        <div className="carousel-inner">
          {bookChunks.map((chunk, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="d-flex justify-content-center gap-3">
                {chunk.map((book, i) => (
                  <div key={i} className="book-card-wrapper">
                    <Card book={book} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators" id="ind">
          {bookChunks.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target={`#bookCarousel-${genre}`}
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {activeIndex > 0 && (
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#bookCarousel-${genre}`}
            data-bs-slide="prev"
            id="left-control"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
        )}
        {activeIndex < totalSlides - 1 && (
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#bookCarousel-${genre}`}
            data-bs-slide="next"
            id="right-control"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCarousel;
