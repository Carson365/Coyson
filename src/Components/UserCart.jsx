import { useUser } from '../UserContext';
import Card from './Card';

function UserCart() {
  const { user } = useUser();

  if (!user || !Array.isArray(user.books) || user.books.length === 0) {
    return <div>No books in cart.</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {user.books.map((book, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card book={book} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '0.75rem',
              }}
            >
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCart;