import { useUser } from '../UserContext';

function UserCart() {
  const { user } = useUser();

  if (!user || !Array.isArray(user.books)) {
    return <div>No books in cart.</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {user.books.map((book, index) => (
          <li key={index}>
            <strong>{book.title || "Untitled"}</strong> by {book.authors?.join(", ") || "Unknown Author"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCart;
