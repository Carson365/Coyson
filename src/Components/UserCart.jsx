import { useUser } from '../UserContext';
import Card from './Card';

function UserCart() {
  const { user, setUser } = useUser();

  const handleQuantityChange = (index, newQty) => {
    const updatedBooks = [...user.books];
    updatedBooks[index].quantity = parseInt(newQty);
    setUser({ ...user, books: updatedBooks });
  };

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
              <div>
                <label>
                  <strong>Qty:</strong>{' '}
                  <select
                    value={book.quantity || 1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    style={{
                      padding: '0.25rem',
                      borderRadius: '4px',
                    }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <p style={{ margin: 0 }}>
                  <strong>Price:</strong> ${book?.price?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCart;