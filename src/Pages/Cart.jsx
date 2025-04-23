import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { useUser } from '../UserContext';
import UserCart from '../Components/UserCart';
import './Cart.css';

function Cart() {
    const { user, setUser } = useUser();
    const books = Array.isArray(user?.books) ? user.books : [];
    const [applyPoints, setApplyPoints] = useState(false);

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

    const getDiscountedTotal = () => {
        const discount = (user?.points || 0) / 100;
        const total = cartTotal - discount;
        return total > 0 ? total : 0;
    };

    return (
        <>
            <Navbar use="Guest" />
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }} id="body">
                <div style={{ width: '75%', overflowY: 'auto', padding: '1rem', paddingTop: '1rem' }} className="cart-container">
                    <h3 id="CardTitle">Your Cart</h3>
                    <div className="cart-items" style={{ marginTop: '-1rem' }}>
                        <UserCart />
                    </div>
                </div>

                <div style={{ width: '25%', display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid #ccc' }}>
                    <div style={{ flex: '1', overflowY: 'auto', padding: '1rem' }}>
                        <h3 id="CardTitle">Cart Details</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {books.map((book, index) => (
                                <li
                                    key={index}
                                    style={{
                                        marginBottom: '1rem',
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        backgroundColor: '#f9f9f9',
                                        position: 'relative',
                                    }}
                                >
                                    <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '6px' }}>
                                        {book.title || 'Untitled'}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}>
                                        <span>Price: ${book.price?.toFixed(2) || '0.00'}</span>
                                        <span>Qty: {book.quantity || 1}</span>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-4px' }}>
                                            <button
                                                onClick={() => handleQuantityChange(index, 1)}
                                                style={{
                                                    border: 'none',
                                                    background: 'none',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    marginBottom: '-8px',
                                                }}
                                            >+</button>
                                            <button
                                                onClick={() => handleQuantityChange(index, -1)}
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
                                    <button
                                        onClick={() => {
                                            const updatedBooks = books.filter((_, i) => i !== index);
                                            setUser({ ...user, books: updatedBooks });
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '16px',
                                            color: '#a00',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ❌
                                    </button>
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
                        <h4>
                            Total: ${applyPoints ? getDiscountedTotal().toFixed(2) : cartTotal.toFixed(2)}
                        </h4>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '1rem',
                        }}>
                            <label htmlFor="applyPoints" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                            }}>
                                <input
                                    type="checkbox"
                                    id="applyPoints"
                                    name="applyPoints"
                                    style={{ transform: 'scale(1.2)' }}
                                    checked={applyPoints}
                                    onChange={() => setApplyPoints(!applyPoints)}
                                    disabled={user?.points <= 0}
                                />
                                Apply {user?.points || 0} Points
                            </label>
                        </div>
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