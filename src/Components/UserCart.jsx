import { useUser } from '../UserContext';
import Card from './Card';

function UserCart() {
  const { user } = useUser();

  if (!user || !Array.isArray(user.books)) {
    return <div>No books in cart.</div>;
  }

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {user.books.map((book, index) => (
          <li key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem'
          }}>
            <div style={{ flex: 1, paddingRight: '1rem' }}>
              <strong>{book.title || "Untitled"}</strong><br />
              <span>by {book.authors?.join(", ") || "Unknown Author"}</span>
            </div>

            <div style={{ flexShrink: 0, marginRight: '3rem' }}>
              <Card book={book} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCart;