import { useNavigate } from 'react-router-dom';

const inspirations = [
  { title: 'Sandton City', distance: '53 km away', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600' },
  { title: 'Cape Town', distance: '1,400 km away', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600' },
  { title: 'Woodmead', distance: '30 km away', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600' },
  { title: 'Hyde Park', distance: '34 km away', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600' },
];

const InspirationSection = () => {
  const navigate = useNavigate();
  return (
    <section className="section container">
      <h2>Inspiration for your next trip</h2>
      <div className="inspiration-grid">
        {inspirations.map((item) => (
          <div
            key={item.title}
            className="inspiration-card"
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={() => navigate(`/search?location=${encodeURIComponent(item.title)}`)}
          >
            <div className="inspiration-card__overlay">
              <h3>{item.title}</h3>
              <p>{item.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspirationSection;
