import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { useUser, useCart } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { /*CompleteTransaction,*/ Checkout, UpdateCartQuantity, RemoveFromCart } from '../Api.js';
import UserCart from '../Components/UserCart';
import './Cart.css';

function Cart() {
    const [rewardMessage, setRewardMessage] = useState(null);
    const { user, setUser } = useUser();
    const [cart, setCart] = useCart();
    const [applyPoints, setApplyPoints] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleQuantityChange = async (index, delta) => {
        const item = cart[index];
        const newQty = (item.quantity || 1) + delta;

        if (newQty < 1) {
            // Remove item from frontend
            const updatedCart = cart.filter((_, i) => i !== index);
            setCart(updatedCart);

            // Remove from backend
            try {
                await RemoveFromCart(user.id, item.book.bookID);
            } catch (error) {
                console.error("Failed to remove item from cart:", error);
            }
        } else {
            // Update quantity normally
            const updatedCart = cart.map((c, i) =>
                i === index ? { ...c, quantity: newQty } : c
            );
            setCart(updatedCart);

            try {
                await UpdateCartQuantity(user.id, item.book.bookID, newQty);
            } catch (error) {
                console.error("Failed to update quantity:", error);
            }
        }
    };




    const calculateTotalPrice = (item) => {
        const qty = item.quantity || 1;
        const price = item.priceAtPurchase || 0;
        return qty * price;
    };

    const cartTotal = cart.reduce((acc, item) => acc + calculateTotalPrice(item), 0);

    const getDiscountedTotal = () => {
        const discount = (user?.points || 0) / 100;
        const total = cartTotal - discount;
        return total > 0 ? total : 0;
    };

    const handleCheckoutClick = () => {
        setShowModal(true);
    };

    const handleConfirmCheckout = async () => {
        setShowModal(false);
        const result = await Checkout(user.id, applyPoints);
    
        if (result !== null) {
            setCart([]);
            setUser(prev => ({ ...prev, points: result.newPointTotal }));
            setRewardMessage(`You earned ${result.pointsEarned} points${applyPoints ? ` (used ${result.pointsUsed})` : ''}.`);
        } else {
            console.error("Checkout failed.");
        }
    };
    
    const handleBackdropClick = () => {
        setShowModal(false); // Just closes, doesn't confirm
    };








    return (
        <>
            <Navbar use="Guest" />
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }} id="body">
                <div style={{ width: '75%', overflowY: 'auto', padding: '1rem' }} className="cart-container">
                    <h3 id="CardTitle">Your Cart</h3>
                    <div className="cart-items" style={{ marginTop: '-1rem' }}>
                        <UserCart />
                    </div>
                </div>

                <div style={{ width: '25%', display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '1px solid #ccc' }}>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                        <h3 id="CardTitle">Cart Details</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {cart.map((item, index) => (
                                <li key={index} style={{
                                    marginBottom: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    backgroundColor: '#f9f9f9',
                                    position: 'relative',
                                }}>
                                    <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '6px' }}>
                                        {item.book?.title || 'Untitled'}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px' }}>
                                        <span>Price: ${item.priceAtPurchase?.toFixed(2) || '0.00'}</span>
                                        <span>Qty: {item.quantity || 1}</span>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-4px' }}>
                                            <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                                            <button onClick={() => handleQuantityChange(index, -1)}>−</button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            const item = cart[index];
                                            try {
                                                await RemoveFromCart(user.id, item.book.bookID);
                                                const updatedCart = cart.filter((_, i) => i !== index);
                                                setCart(updatedCart);
                                            } catch (error) {
                                                console.error("Error removing item from backend:", error);
                                            }
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
                        color: 'white',
                    }}>
                        <h4>Total: ${applyPoints ? getDiscountedTotal().toFixed(2) : cartTotal.toFixed(2)}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                            <label htmlFor="applyPoints" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                <input
                                    type="checkbox"
                                    id="applyPoints"
                                    checked={applyPoints}
                                    onChange={() => setApplyPoints(!applyPoints)}
                                    disabled={user?.points <= 0}
                                />
                                Apply {user?.points || 0} Points
                            </label>
                        </div>
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
                    top: 0,
                    left: 0,
                    zIndex: 10000,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} onClick={handleBackdropClick}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            minWidth: '300px',
                            maxWidth: '600px',
                            textAlign: 'center',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4>Checkout Summary</h4>
                        <div>
                            {cart.map((item, index) => (
                                <p key={index}>
                                    {item.quantity || 1} {item.book?.title} ${calculateTotalPrice(item).toFixed(2)}
                                </p>
                            ))}
                        </div>
                        <hr />
                        <strong><p style={{ color: 'black' }}>Total: ${applyPoints ? getDiscountedTotal().toFixed(2) : cartTotal.toFixed(2)}</p></strong>
                        {applyPoints && <p>Discount Applied: ${((user?.points || 0) / 100).toFixed(2)}</p>}
                        <button
                            onClick={handleConfirmCheckout}
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
            {rewardMessage && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 10001,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onClick={() => setRewardMessage(null)}>
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            minWidth: '300px',
                            maxWidth: '600px',
                            textAlign: 'center'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4>Thanks for your purchase!</h4>
                        <p>{rewardMessage}</p>
                        <button
                            onClick={() => {
                                setRewardMessage(null);
                                navigate('/');
                            }}
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
                            Close
                        </button>
                    </div>
                </div>
            )}

        </>
    );
}

export default Cart;
