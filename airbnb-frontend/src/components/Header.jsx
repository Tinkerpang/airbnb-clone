import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const SA_LOCATIONS = [
  'Sandton, Johannesburg',
  'Woodmead, Johannesburg',
  'Cape Town City Centre',
  'Hyde Park, Johannesburg',
  'Stellenbosch, Western Cape',
  'Umhlanga, Durban',
];

const Header = ({ transparent = false }) => {
  const [location, setLocation] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`header ${transparent ? 'header--transparent' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
            <path d="M16 1c1.7 0 3 1.3 3 3 0 .9-.4 1.7-1 2.3C21.8 9.6 26 16.4 26 20.5 26 25.2 21.5 29 16 29S6 25.2 6 20.5C6 16.4 10.2 9.6 14 6.3c-.6-.6-1-1.4-1-2.3 0-1.7 1.3-3 3-3z" />
          </svg>
          <span>airbnb</span>
        </Link>

        <form className="header__search" onSubmit={handleSearch}>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="header__search-select"
          >
            <option value="">Anywhere in South Africa</option>
            {SA_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <button type="submit" className="header__search-btn" aria-label="Search">
            🔍
          </button>
        </form>

        <div className="header__right">
          {user ? (
            <div className="header__profile">
              <button className="header__profile-btn" onClick={() => setMenuOpen((v) => !v)}>
                <span>Hi, {user.username.split(' ')[0]}</span>
                <span className="header__avatar">☰</span>
              </button>
              {menuOpen && (
                <div className="header__dropdown">
                  <Link to="/reservations" onClick={() => setMenuOpen(false)}>View Reservations</Link>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header__become-host">Become a host</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
