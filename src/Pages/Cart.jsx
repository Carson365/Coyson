import React from 'react';
import Navbar from '../Components/Navbar';
import { TenCards } from '../Components/Card';
import { useUser } from '../UserContext';
import UserCart from '../Components/UserCart';

function Cart() {
    const { user } = useUser();
    console.log(user.books);

    return (
        <>
            <Navbar use="Guest" />
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }} id="body">
                
                <div style={{ width: '33.33%', overflowY: 'auto' }}>
                    <div style={{ height: '100%', padding: '1rem' }}>
                        <h3 id="CardTitle">More {"Fiction"}</h3>
                        <TenCards genre={"Fiction"} />
                    </div>
                </div>

                <div style={{ width: '66.66%', overflowY: 'auto', padding: '1rem' }} className="cart-container">
                    <h2 className="cart-title">Your Cart</h2>
                    <div className="cart-items">
                        <UserCart />
                    </div>
                    <button className="checkout-button">Checkout</button>
                </div>
            </div>
        </>
    );
}

export default Cart;