import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home.jsx';
import Search from '../Pages/Search.jsx';
import Book from '../Pages/Book.jsx';
import Genre from '../Pages/Genre.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/book/:bookID" element={<Book />} />
        <Route path="/genre/:genre" element={<Genre />} />
      </Routes>
    </Router>
  );
}

export default App;