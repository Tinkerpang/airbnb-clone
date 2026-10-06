import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './MyReservations.css';

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-ZA', {
  day: '2-digit', month: '2-digit', year: 'numeric',
});

const MyReservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await api.get('/reservations/user');
        setReservations(data);
      } catch (err) {
        setError('Could not load your reservations.');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this reservation?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/reservations/${id}`);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not cancel reservation.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <Header />
      <div className="my-reservations container">
        <h2>My Reservations</h2>
        {!user && <p>Please log in to view your reservations.</p>}
        {loading && <div className="spinner-wrap">Loading...</div>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && user && (
          <table className="my-reservations__table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 && (
                <tr><td colSpan="6">You have no reservations yet.</td></tr>
              )}
              {reservations.map((r) => (
                <tr key={r._id}>
                  <td>{r.propertyTitle}</td>
                  <td>{formatDate(r.checkIn)}</td>
                  <td>{formatDate(r.checkOut)}</td>
                  <td>{r.guests}</td>
                  <td>R{r.total}</td>
                  <td>
                    <button
                      className="btn"
                      style={{ background: '#FF385C', color: '#fff' }}
                      onClick={() => handleDelete(r._id)}
                      disabled={deletingId === r._id}
                    >
                      {deletingId === r._id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyReservations;
