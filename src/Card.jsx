const Card = ({ book }) => {
  const handleCardClick = () => {
    // Handle card click event if needed
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
          <strong>By: </strong>{(book.authors && book.authors.length > 0) ? book.authors[0] : "Not available"}
        </p>
      </div>
    </div>
  );
};

export default Card;