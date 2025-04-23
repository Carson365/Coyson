import React from 'react';
import Navbar from '../Components/Navbar';
import { useUser } from '../UserContext';
import UserCart from '../Components/UserCart';
import './Cart.css';

function Cart() {
    const { user, setUser } = useUser();

    const books = Array.isArray(user?.books) ? user.books : [];

    const handleQuantityChange = (index, delta) => {
        const updatedBooks = [...books];
        const currentQty = updatedBooks[index].quantity || 1;
        const newQty = Math.max(1, currentQty + delta);
        updatedBooks[index].quantity = newQty;
        setUser({ ...user, books: updatedBooks });
    };

    const calculateTotalPrice = (book) => {
        const qty = book.quantity || 1;
        const price = book.price || 0;
        return qty * price;
    };

    const cartTotal = books.reduce((acc, book) => acc + calculateTotalPrice(book), 0);

    const handleRowClick = (book, index) => {
        console.log(`Clicked row for: ${book.title || 'Untitled'}, index: ${index}`);
    };

    return (
        <>
            <Navbar use="Guest" />
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }} id="body">

                {/* Left - Cart items */}
                <div style={{ width: '75%', overflowY: 'auto', padding: '1rem', paddingTop: '1rem' }} className="cart-container">
                    <h3 id="CardTitle">Your Cart</h3>
                    <div className="cart-items" style={{ marginTop: '-1rem' }}>
                        <UserCart />
                    </div>
                </div>

                {/* Right - Cart details */}
                <div style={{ width: '25%', display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid #ccc' }}>
                    {/* Scrollable row container */}
                    <div style={{ flex: '1', overflowY: 'auto', padding: '1rem' }}>
                        <h3 id="CardTitle">Cart Details</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {books.map((book, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleRowClick(book, index)}
                                    style={{
                                        marginBottom: '1rem',
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s ease',
                                        backgroundColor: '#f9f9f9',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                                >
                                    <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '6px' }}>
                                        {book.title || 'Untitled'}
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}>
                                        <span>Price: ${book.price?.toFixed(2) || '0.00'}</span>
                                        <span>Qty: {book.quantity || 1}</span>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-4px' }}>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, 1); }}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    marginBottom: '-8px',
                                                }}
                                            >+</button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, -1); }}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    marginTop: '-4px',
                                                }}
                                            >−</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{
                        borderTop: '1px solid #ccc',
                        padding: '1rem',
                        backgroundColor: '#333',
                        boxShadow: '0 -2px 5px rgba(0,0,0,0.05)',
                        color: 'white',
                    }}>
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
        </>
    );
}

export default Cart;