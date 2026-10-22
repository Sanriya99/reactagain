import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <>
      <header className="navbar">
        <NavLink to="/" className="brand">
          <span className="brand-dot" />
          Sandra
        </NavLink>
        <nav className="links">
          <NavLink to="/" end>Home</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h2 className="not-found">Page not found</h2>} />
        </Routes>
      </main>
    </>
  );
}
