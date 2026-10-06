const demoReviews = [
  { name: 'Thabo', date: 'December 2025', text: 'Host was very attentive and the location was perfect.' },
  { name: 'Lindiwe', date: 'November 2025', text: 'Beautiful place, super clean and exactly as pictured.' },
  { name: 'Pieter', date: 'October 2025', text: 'Great neighbourhood, easy access to restaurants and shops.' },
  { name: 'Naledi', date: 'September 2025', text: 'Well designed and comfortable stay, would book again.' },
];

const ReviewsSection = ({ listing }) => {
  const ratings = listing.specificRatings || {};
  return (
    <section className="reviews">
      <h3>⭐ {listing.rating?.toFixed(1)} &middot; {listing.reviews} reviews</h3>
      <div className="reviews__bars">
        {Object.entries(ratings).map(([key, value]) => (
          <div key={key} className="reviews__bar-row">
            <span className="reviews__bar-label">{key}</span>
            <div className="reviews__bar-track">
              <div className="reviews__bar-fill" style={{ width: `${(value / 5) * 100}%` }} />
            </div>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="reviews__grid">
        {demoReviews.map((review) => (
          <div key={review.name} className="reviews__item">
            <div className="reviews__avatar">{review.name[0]}</div>
            <div>
              <strong>{review.name}</strong>
              <p className="reviews__date">{review.date}</p>
              <p>{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
