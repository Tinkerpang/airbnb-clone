import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import CostCalculator from '../components/CostCalculator';
import ReviewsSection from '../components/ReviewsSection';
import HostCard from '../components/HostCard';
import ThingsToKnow from '../components/ThingsToKnow';
import api from '../api/axios';
import './Listing.css';

const Listing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/accommodations/${id}`);
        setListing(data);
      } catch (err) {
        setError('Could not load this listing.');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="spinner-wrap">Loading listing...</div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div>
        <Header />
        <div className="spinner-wrap error-text">{error || 'Listing not found.'}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="listing-page container">
        <h1>{listing.title}</h1>
        <p className="listing-page__subheading">
          ⭐ {listing.rating?.toFixed(1)} &middot; {listing.reviews} reviews &middot; 🏅 Superhost &middot; {listing.location}
        </p>

        <ImageGallery images={listing.images} />

        <div className="listing-page__body">
          <div className="listing-page__main">
            <div className="listing-page__host-row">
              <div>
                <h2>Entire place hosted by {listing.host}</h2>
                <p>{listing.guests} guests &middot; {listing.bedrooms} bedrooms &middot; {listing.beds} beds &middot; {listing.bathrooms} baths</p>
              </div>
              <div className="listing-page__host-avatar">{listing.host?.[0]}</div>
            </div>

            <ul className="listing-page__highlights">
              <li>🏠 Entire home — You&apos;ll have the place to yourself</li>
              {listing.enhancedCleaning && <li>✨ Enhanced Clean — 5-step enhanced cleaning process</li>}
              {listing.selfCheckIn && <li>🔑 Self check-in — Check yourself in with the keypad</li>}
            </ul>

            <p className="listing-page__description">{listing.description}</p>

            <hr />
            <h3>What this place offers</h3>
            <div className="listing-page__amenities">
              {listing.amenities?.map((amenity) => (
                <span key={amenity}>✔ {amenity}</span>
              ))}
            </div>

            <hr />
            <ReviewsSection listing={listing} />

            <hr />
            <HostCard hostName={listing.host} />

            <hr />
            <ThingsToKnow />
          </div>

          <div className="listing-page__sidebar">
            <CostCalculator listing={listing} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Listing;
