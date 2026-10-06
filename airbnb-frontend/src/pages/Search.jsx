import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LocationCard from '../components/LocationCard';
import api from '../api/axios';
import './Search.css';

const FILTERS = ['Free cancellation', 'Type of place', 'Price', 'Instant Book', 'More filters'];

const Search = () => {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location') || '';

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/accommodations', {
          params: locationQuery ? { location: locationQuery } : {},
        });
        setListings(data);
      } catch (err) {
        setError('Could not load listings. Please try again shortly.');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [locationQuery]);

  return (
    <div>
      <Header />
      <div className="search-page container">
        <h2 className="search-page__heading">
          {listings.length}+ stays {locationQuery ? `in ${locationQuery}` : 'in South Africa'}
        </h2>

        <div className="search-page__filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`filter-pill ${activeFilter === filter ? 'filter-pill--active' : ''}`}
              onClick={() => setActiveFilter(filter === activeFilter ? '' : filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading && <div className="spinner-wrap">Loading stays...</div>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && listings.length === 0 && (
          <p>No stays found for this location yet. Try another South African city!</p>
        )}

        <div className="search-page__list">
          {listings.map((listing) => (
            <LocationCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
