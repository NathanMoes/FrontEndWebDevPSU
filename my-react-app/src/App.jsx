import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Houses from './pages/Houses';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">About</Link>
          </li>
          <li>
            <Link to="/houses">Users</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/houses" element={<Houses />} />
      </Routes>
    </Router>
  );
}

export default App;
