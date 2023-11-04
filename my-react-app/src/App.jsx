import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Houses from './pages/Houses';
import Search from './pages/Search';
import { Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" active>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>{' '}
        <Nav bg="dark">
          <Nav.Link className="" as={Link} to="/search" active={'/search'}>
            Search
          </Nav.Link>
          <Nav.Link className="" as={Link} to="/houses" active={'/houses'}>
            Houses
          </Nav.Link>
        </Nav>
      </Navbar>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/houses" element={<Houses />} />
      </Routes>
    </Router>
  );
}

export default App;
