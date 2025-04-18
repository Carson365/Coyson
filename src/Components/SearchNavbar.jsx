import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearchChange }) => {
  const navigate = useNavigate();
  return (
    <nav style={styles.navbar}>
      <div class="navbar-brand" style={styles.left}>
      <button onClick={() => navigate(-1)} className="btn btn-outline-light btn-sm">
          Back
      </button>
      </div>

      <div style={styles.center}>
        <input
          id="SearchNavbar"
          type="text"
          placeholder="Search books..."
          style={styles.searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div style={styles.right}></div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#212529',
    padding: '10px 30px',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 100000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  center: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
  },
  brand: {
    textDecoration: 'none',
  },
  brandText: {
    color: 'white',
    margin: 0,
    /*fontWeight: 'bold',*/
    fontSize: '24px',
  },
  searchInput: {
    width: '60%',
    maxWidth: '500px',
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
};

export default Navbar;