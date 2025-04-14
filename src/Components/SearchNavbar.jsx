import React from 'react';

const Navbar = ( {onSearchChange} ) => {
  return (
    <nav style={styles.navbar}>
      <a className="navbar-brand" href="/">3rd & Chester</a>
      <input
        id="SearchNavbar"
        type="text"
        placeholder="Search books..."
        style={styles.searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
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