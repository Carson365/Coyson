import React from 'react';
import Navbar from '../Components/Navbar';
import { TenCards } from '../Components/Card';
import { useUser } from '../UserContext';
import UserCart from '../Components/UserCart';

function Cart() {
    const { user } = useUser();

    const books = Array.isArray(user?.books) ? user.books : [];

    const calculateTotalPrice = (book) => {
        const qty = book.quantity || 1;
        const price = book.price || 0;
        return qty * price;
    };

    const cartTotal = books.reduce((acc, book) => acc + calculateTotalPrice(book), 0);

    return (
        <>
            <Navbar use="Guest" />
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }} id="body">

                <div style={{ width: '75%', overflowY: 'auto', padding: '1rem' }} className="cart-container">
                    <h2 className="cart-title">Your Cart</h2>
                    <div className="cart-items">
                        <UserCart />
                    </div>
                </div>

                <div style={{ width: '25%', overflowY: 'auto', borderLeft: '1px solid #ccc' }}>
                    <div style={{ height: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h3 id="CardTitle">Cart Details</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {books.map((book, index) => (
                                    <li key={index} style={{ marginBottom: '1rem' }}>
                                        <p style={{ margin: 0, fontWeight: 'bold' }}>{book.title || 'Untitled'}</p>
                                        <p style={{ margin: 0 }}>Qty: {book.quantity || 1}</p>
                                        <p style={{ margin: 0 }}>
                                            Total: ${calculateTotalPrice(book).toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                            <h4>Total: ${cartTotal.toFixed(2)}</h4>
                            <button
                                style={{
                                    marginTop: '1rem',
                                    padding: '0.75rem',
                                    width: '100%',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
