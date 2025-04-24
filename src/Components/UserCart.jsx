import { useCart } from '../UserContext';
import Card from './Card';

function UserCart() {
  const [cart] = useCart();

  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', color: 'white' }}>
        Your cart is empty
      </div>
    );
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
        {cart.map((item, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Card book={item.book} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCart;
