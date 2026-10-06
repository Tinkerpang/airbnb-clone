import { useNavigate } from 'react-router-dom';

const LocationCard = ({ listing }) => {
  const navigate = useNavigate();
  return (
    <div className="location-card" onClick={() => navigate(`/listing/${listing._id}`)}>
      <img src={listing.images?.[0]} alt={listing.title} className="location-card__image" />
      <div className="location-card__details">
        <p className="location-card__type">{listing.type}</p>
        <h3>{listing.title}</h3>
        <p className="location-card__meta">
          {listing.guests} guests &middot; {listing.type.includes('Entire') ? 'Entire Home' : listing.type} &middot; {listing.beds} beds &middot; {listing.bathrooms} bath
        </p>
        <p className="location-card__amenities">{listing.amenities?.slice(0, 3).join(' · ')}</p>
        <div className="location-card__bottom">
          <span className="location-card__rating">⭐ {listing.rating?.toFixed(1)} ({listing.reviews} reviews)</span>
          <span className="location-card__price">R{listing.price} <small>/night</small></span>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
