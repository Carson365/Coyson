function AdminSidebar() {
    return (
      <div style={sidebarStyle}>
        <ul style={listStyle}>
          {["Create Book"].map((tab, idx) => (
            <li key={idx} style={tabStyle}>
              {tab}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  const sidebarStyle = {
    width: '200px',
    backgroundColor: 'black',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
  };
  
  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    width: '100%',
  };
  
  const tabStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    borderBottom: '1px solid #444',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  };
  
  export default AdminSidebar;
  