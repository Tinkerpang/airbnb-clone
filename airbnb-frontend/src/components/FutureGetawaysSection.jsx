import { useState } from 'react';

const tabs = {
  'Arts & culture': [
    { name: 'Sandton', region: 'Gauteng' },
    { name: 'Cape Town', region: 'Western Cape' },
    { name: 'Durban', region: 'KwaZulu-Natal' },
    { name: 'Stellenbosch', region: 'Western Cape' },
  ],
  'Outdoor adventure': [
    { name: 'Drakensberg', region: 'KwaZulu-Natal' },
    { name: 'Garden Route', region: 'Western Cape' },
    { name: 'Kruger', region: 'Mpumalanga' },
    { name: 'Hermanus', region: 'Western Cape' },
  ],
  'Mountain cabins': [
    { name: 'Dullstroom', region: 'Mpumalanga' },
    { name: 'Franschhoek', region: 'Western Cape' },
    { name: 'Clarens', region: 'Free State' },
    { name: 'Magaliesburg', region: 'Gauteng' },
  ],
};

const FutureGetawaysSection = () => {
  const [active, setActive] = useState(Object.keys(tabs)[0]);

  return (
    <section className="section container">
      <h2>Inspiration for future getaways</h2>
      <div className="tabs">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={`tabs__tab ${active === tab ? 'tabs__tab--active' : ''}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tabs__grid">
        {tabs[active].map((place) => (
          <div key={place.name} className="tabs__item">
            <strong>{place.name}</strong>
            <span>{place.region}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FutureGetawaysSection;
