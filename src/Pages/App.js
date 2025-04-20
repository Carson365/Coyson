import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home.jsx';
import Search from '../Pages/Search.jsx';
import Book from '../Pages/Book.jsx';
import Genre from '../Pages/Genre.jsx';
import Cart from '../Pages/Cart.jsx';
import ProtectedRoute from '../ProtectedRoute.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/book/:bookID" element={<Book />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/login" element={<Search />} />
        <Route path="/cart" element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;