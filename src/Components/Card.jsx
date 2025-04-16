import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { booksByGenre } from "../Api";

const Card = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${encodeURIComponent(book.id)}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="img-container">
        <img 
          className="card-img-top" 
          src={book.image || "https://via.placeholder.com/150"} 
          alt="Book cover" 
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          <strong>By: </strong>{(book.authors && book.authors.length > 0) ? book.authors[0] : "Not available"}<br />
          <strong>Genre: </strong>{book.categories}
        </p>
      </div>
    </div>
  );
};


export function TenCards({ genre }) {
  const [randomCards, setRandomCards] = useState([]);

  useEffect(() => {
    if (!genre || !booksByGenre[genre]) return;

    const allBooks = booksByGenre[genre];
    const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);

    setRandomCards(selected);
  }, [genre]);

  return (
    <>
      <h3 id="CardTitle">More {genre}</h3>
      <div className="card-container">
        {randomCards.map((book) => (
          <div className="card" key={book.id}>
            <Card book={book} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;