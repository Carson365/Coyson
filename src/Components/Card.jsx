import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { booksByGenre } from "../Api";

const Card = ({ book, type = "bookPage" }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if(type == "addToCart"){
      console.log('added to cart');
    } else if (type == "bookPage"){
      navigate(`/book/:${encodeURIComponent(book.id)}`);
    }
  };

  const cardStyle = {
    width: "100%",
    minWidth: "225px",
    maxWidth: "300px",
    margin: "2%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    textDecoration: "none",
    border: "1px solid #ddd",
    borderRadius: "0", 
    overflow: "visible",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    flexShrink: "0",
    zIndex: "100",
  };

  const imgContainerStyle = {
    height: "500px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  };

  const cardBodyStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    position: "absolute",
    bottom: "0", 
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    opacity: "0",
    transition: "opacity 0.5s ease",
    color: "white",
    boxSizing: "border-box",
    zIndex: "10",
  };

  return (
    <div
      className={`card card-${book.id}`}
      style={cardStyle}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.04)";
        const cardBody = e.currentTarget.querySelector(".card-body");
        cardBody.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        const cardBody = e.currentTarget.querySelector(".card-body");
        cardBody.style.opacity = "0";
      }}
    >
      <div className="img-container" style={imgContainerStyle}>
        <img
          className="card-img-top"
          src={book.image || "https://via.placeholder.com/150"}
          alt="Book cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="card-body" style={cardBodyStyle}>
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          <strong>By: </strong>
          {(book.authors && book.authors.length > 0)
            ? book.authors[0]
            : "Not available"}
          <br />
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
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", padding: "0 1rem", marginTop: "1rem", position: "relative" }}>
        {randomCards.map((book) => (
          <Card book={book} key={book.id} />
        ))}
      </div>
    </>
  );
}

export default Card;
