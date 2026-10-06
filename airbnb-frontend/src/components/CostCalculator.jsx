import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const msPerNight = 1000 * 60 * 60 * 24;

const CostCalculator = ({ listing }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return diff > 0 ? Math.round(diff / msPerNight) : 0;
  }, [checkIn, checkOut]);

  const subtotal = nights * (listing.price || 0);
  const weeklyDiscount = nights >= 7 ? listing.weeklyDiscount || 0 : 0;
  const total =
    subtotal - weeklyDiscount + (listing.cleaningFee || 0) + (listing.serviceFee || 0) + (listing.occupancyTaxes || 0);

  const handleReserve = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!user) {
      navigate('/login');
      return;
    }
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    if (nights <= 0) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    if (guests < 1 || guests > listing.guests) {
      setError(`Guests must be between 1 and ${listing.guests}.`);
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/reservations', {
        accommodationId: listing._id,
        checkIn,
        checkOut,
        guests,
        total,
      });
      setMessage('Reservation confirmed! Check "View Reservations" to see it.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not complete reservation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cost-calculator">
      <div className="cost-calculator__price">
        <span className="cost-calculator__amount">R{listing.price}</span> / night
        <span className="cost-calculator__rating"> &middot; ⭐ {listing.rating?.toFixed(1)} · {listing.reviews} reviews</span>
      </div>

      <form onSubmit={handleReserve} className="cost-calculator__form">
        <div className="cost-calculator__dates">
          <label>
            CHECK-IN
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </label>
          <label>
            CHECKOUT
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </label>
        </div>
        <label className="cost-calculator__guests">
          GUESTS
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: listing.guests || 1 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </label>

        <button className="btn btn-primary cost-calculator__reserve" type="submit" disabled={submitting}>
          {submitting ? 'Reserving...' : 'Reserve'}
        </button>

        {error && <p className="error-text">{error}</p>}
        {message && <p className="success-text">{message}</p>}

        <p className="cost-calculator__note">You won&apos;t be charged yet</p>

        {nights > 0 && (
          <div className="cost-calculator__breakdown">
            <div><span>R{listing.price} x {nights} nights</span><span>R{subtotal}</span></div>
            {weeklyDiscount > 0 && (
              <div className="discount"><span>Weekly discount</span><span>-R{weeklyDiscount}</span></div>
            )}
            <div><span>Cleaning fee</span><span>R{listing.cleaningFee}</span></div>
            <div><span>Service fee</span><span>R{listing.serviceFee}</span></div>
            <div><span>Occupancy taxes and fees</span><span>R{listing.occupancyTaxes}</span></div>
            <div className="cost-calculator__total"><span>Total</span><span>R{total}</span></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CostCalculator;
