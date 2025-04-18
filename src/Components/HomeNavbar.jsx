import React from 'react';
import defaultProfile from '../assets/defaultProfile.png';
import cartIcon from '../assets/icons8-shopping-cart-48.png';
import searchIcon from '../assets/search.png';

const Navbar = ({ user = "Guest" }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed w-100" style={styles.navbar}>
      <div className="navbar-brand d-flex align-items-center" style={styles.homeButton}>
        <h3 style={{ marginRight: "15px" }}>3rd & Chester</h3>
      </div>

      <div className="container-fluid d-flex justify-content-between">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="d-flex ms-auto">
          <ul className="navbar-nav d-flex" id="list" style={styles.navItems}>
            <li className="nav-item active d-flex" style={styles.navItem}>

              <a href="/#/search" className="d-flex flex-column align-items-center" style={{ ...styles.link, ...styles.transactionsLink }} id="transactions">
                <span style={styles.transactionsText}>Search</span>
                <img src={searchIcon} alt="Search" style={styles.transactionsIcon} />
              </a>

              <a href="#" className="d-flex flex-column align-items-center" style={{ ...styles.link, ...styles.cartLink }} id="cart">
                <span style={styles.cartText}>View Cart</span>
                <img src={cartIcon} alt="Cart" style={styles.cartIcon} />
              </a>
            </li>
          </ul>

          <a href="#" className="d-flex text-decoration-none">
            <div style={styles.nameContainer}>
              {user !== 'Guest' ? (
                <>
                  <span style={styles.welcomeText}>Welcome,</span>
                  <span style={styles.userName}>{user}</span>
                </>
              ) : (
                <>
                  <span style={styles.welcomeText}>Click to</span>
                  <span style={styles.userName}>Login</span>
                </>
              )}
            </div>
            <img 
              src={defaultProfile}
              alt="Profile" 
              style={styles.profileImage} 
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '0',
    top: '0',
    left: '0',
    zIndex: '10000',
  },
  profileImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    clipPath: 'circle(38% at 50% 50%)',
    marginRight: '10px',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
  },
  cartText: {
    color: '#fff', 
    fontSize: '14px',
    fontWeight: 'bold',
  },
  cartIcon: {
    width: '25px',
    height: '25px',
  },
  link: {
    textDecoration: 'none',
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
  },
  transactionsLink: {
    marginRight: '30px',
    textAlign: 'center',
  },
  transactionsText: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    position: 'relative',
    top: '-3px',
  },
  transactionsIcon: {
    width: '20px',
    height: '20px',
  },
  cartLink: {
    marginRight: '30px',
    textAlign: 'center',
  },
  homeButton: {
    cursor: 'default',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 15px',
  },
};

export default Navbar;
