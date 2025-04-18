import React from 'react';
import defaultProfile from '../assets/defaultProfile.png';
import cartIcon from '../assets/icons8-shopping-cart-48.png';
import searchIcon from '../assets/search.png';
import { Link } from 'react-router-dom';

const Navbar = ({ user = "Guest" }) => {

  return (
    <nav className="navbar navbar-dark bg-dark position-fixed w-100" style={styles.navbar}>
      <div className="container-fluid d-flex justify-content-between align-items-center">

        <div className="navbar-brand" style={styles.homeButton}>
            <Link to="/#/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 style={{ margin: 0 }}>3rd & Chester</h3>
            </Link>
        </div>

        <div className="d-flex align-items-center">
          <ul className="navbar-nav flex-row" style={styles.navItems}>
            <li className="nav-item mx-3 text-center">
              <a href="/#/search" className="nav-link d-flex flex-column align-items-center" style={styles.link}>
                <span style={styles.transactionsText}>Search</span>
                <img src={searchIcon} alt="Search" style={styles.transactionsIcon} />
              </a>
            </li>

            <li className="nav-item mx-3 text-center">
              <a href="#" className="nav-link d-flex flex-column align-items-center" style={styles.link}>
                <span style={styles.cartText}>View Cart</span>
                <img src={cartIcon} alt="Cart" style={styles.cartIcon} />
              </a>
            </li>
          </ul>

          <a href="#" className="d-flex text-decoration-none align-items-center ms-3">
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
            <img src={defaultProfile} alt="Profile" style={styles.profileImage} />
          </a>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    padding: '4px 10px',
    top: 0,
    left: 0,
    zIndex: '10000',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    clipPath: 'circle(38% at 50% 50%)',
    marginLeft: '10px',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  welcomeText: {
    fontSize: '13px',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: '15px',
    fontWeight: 'bold',
  },
  cartText: {
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  cartIcon: {
    width: '22px',
    height: '22px',
  },
  link: {
    textDecoration: 'none',
  },
  navItems: {
    marginBottom: 0,
  },
  transactionsText: {
    color: '#fff',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '2px',
  },
  transactionsIcon: {
    width: '20px',
    height: '20px',
  },
  homeButton: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#fff',
  },
};

export default Navbar;
