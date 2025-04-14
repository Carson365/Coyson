import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home.jsx';
import Search from '../Pages/Search.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Search" element={<Search />}/>
      </Routes>
    </Router>
  );
}

export default App;