import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { CompleteTransaction, FetchCart, UpdateCartQuantity, RemoveFromCart } from '../Api.js';
import './Cart.css';

function Cart() {
    const { user } = useUser();
    const [cartItems, setCartItems] = useState([]);
    const [applyPoints, setApplyPoints] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id) {
            FetchCart(user.id).then(setCartItems);
        }
    }, [user]);

    const handleQuantityChange = async (bookId, delta) => {
        const updated = cartItems.map(item =>
            item.BookID === bookId
                ? { ...item, Quantity: Math.max(1, (item.Quantity || 1) + delta) }
                : item
        );
        setCartItems(updated);
        const target = updated.find(i => i.BookID === bookId);
        await UpdateCartQuantity(user.id, bookId, target.Quantity);
    };

    const handleRemoveItem = async (bookId) => {
        setCartItems(cartItems.filter(item => item.BookID !== bookId));
        await RemoveFromCart(user.id, bookId);
    };

    const calculateTotalPrice = (item) => (item.PriceAtPurchase || 0) * (item.Quantity || 1);
    const cartTotal = cartItems.reduce((sum, item) => sum + calculateTotalPrice(item), 0);
    const getDiscountedTotal = () => Math.max(0, cartTotal - (user?.points || 0) / 100);

    const handleCheckoutClick = () => setShowModal(true);
    const confirmPurchase = () => {
        CompleteTransaction(applyPoints);
        navigate('/');
    };

    return (
        <>
            <Navbar use="Guest" />
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }} id="body">
                <div style={{ width: '75%', overflowY: 'auto', padding: '1rem' }} className="cart-container">
                    <h3 id="CardTitle">Your Cart</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {cartItems.map((item, index) => (
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
                                    {item.BookTitle || 'Untitled'}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}>
                                    <span>Price: ${Number(item.PriceAtPurchase || 0).toFixed(2)}</span>
                                    <span>Qty: {item.Quantity || 1}</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-4px' }}>
                                        <button
                                            onClick={() => handleQuantityChange(item.BookID, 1)}
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                marginBottom: '-8px',
                                            }}
                                        >+</button>
                                        <button
                                            onClick={() => handleQuantityChange(item.BookID, -1)}
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
                                    onClick={() => handleRemoveItem(item.BookID)}
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
                    width: '25%',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderLeft: '1px solid #ccc'
                }}>
                    <div style={{ flex: '1', overflowY: 'auto', padding: '1rem' }}>
                        <h3 id="CardTitle">Cart Details</h3>
                        <h4>Total: ${applyPoints ? getDiscountedTotal().toFixed(2) : cartTotal.toFixed(2)}</h4>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            marginTop: '1rem'
                        }}>
                            <input
                                type="checkbox"
                                checked={applyPoints}
                                onChange={() => setApplyPoints(!applyPoints)}
                                disabled={user?.points <= 0}
                                style={{ transform: 'scale(1.2)' }}
                            />
                            Apply {user?.points || 0} Points
                        </label>
                        <button
                            onClick={handleCheckoutClick}
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

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '10000',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} onClick={() => setShowModal(false)}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            width: 'auto',
                            minWidth: '300px',
                            maxWidth: '600px',
                            textAlign: 'center',
                            height: 'auto',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4>Checkout Summary</h4>
                        <div>
                            {cartItems.map((item, index) => (
                                <p key={index}>
                                    {item.Quantity || 1} × {item.BookTitle || 'Untitled'} = ${calculateTotalPrice(item).toFixed(2)}
                                </p>
                            ))}
                        </div>
                        <hr />
                        <strong>
                            <p style={{ color: 'black' }}>
                                Total: ${applyPoints ? getDiscountedTotal().toFixed(2) : cartTotal.toFixed(2)}
                            </p>
                        </strong>
                        {applyPoints && <p>Discount Applied: ${((user?.points || 0) / 100).toFixed(2)}</p>}
                        <button
                            onClick={confirmPurchase}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;
