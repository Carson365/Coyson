import React, { useState } from 'react';
import defaultProfile from '../assets/defaultProfile.png';
import cartIcon from '../assets/icons8-shopping-cart-48.png';
import searchIcon from '../assets/search.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Navbar = () => {
  const { user, setUser } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowMenu(prev => !prev); // toggle menu
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowMenu(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-dark bg-dark position-fixed w-100" style={styles.navbar}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="navbar-brand" style={styles.homeButton}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 style={{ margin: 0 }}>3rd & Chester</h3>
          </Link>
        </div>

        <div className="d-flex align-items-center position-relative">
          <ul className="navbar-nav flex-row" style={styles.navItems}>
            <li className="nav-item mx-3 text-center">
              <Link to="/search" className="nav-link d-flex flex-column align-items-center" style={styles.link}>
                <span style={styles.transactionsText}>Search</span>
                <img src={searchIcon} alt="Search" style={styles.transactionsIcon} />
              </Link>
            </li>

            <li className="nav-item mx-3 text-center">
              <Link to="/cart" className="nav-link d-flex flex-column align-items-center" style={styles.link}>
                <span style={styles.cartText}>View Cart</span>
                <img src={cartIcon} alt="Cart" style={styles.cartIcon} />
              </Link>
            </li>
          </ul>

          <div
            className="d-flex text-decoration-none align-items-center ms-3"
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={handleLoginClick}
          >
            <div style={styles.nameContainer}>
              {user && user.name ? (
                <>
                  <span style={styles.welcomeText}>Welcome,</span>
                  <span style={styles.userName}>{user.name}</span>
                </>
              ) : (
                <>
                  <span style={styles.welcomeText}>Click to</span>
                  <span style={styles.userName}>Login</span>
                </>
              )}
            </div>
            {user && user.profileImg && (
              <img src={user.profileImg} alt="Profile" style={styles.profileImage} />
            )}
          </div>

          {user && showMenu && (
            <div style={styles.dropdownMenu}>
              <button onClick={handleLogout} style={styles.dropdownItem}>Logout</button>
            </div>
          )}
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
  dropdownMenu: {
    position: 'absolute',
    top: '80%',
    right: '0',
    background: '#222',
    border: '1px solid #555',
    padding: '10px',
    borderRadius: '4px',
    zIndex: 1000,
  },
  dropdownItem: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px 10px',
    width: '100%',
    textAlign: 'left',
  }
};

export default Navbar;
