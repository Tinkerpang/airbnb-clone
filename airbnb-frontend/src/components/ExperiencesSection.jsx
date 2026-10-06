const ExperiencesSection = () => (
  <section className="section container">
    <h2>Discover Airbnb Experiences</h2>
    <div className="experiences-grid">
      <div
        className="experience-card"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800)' }}
      >
        <div className="experience-card__content">
          <h3>Things to do on your trip</h3>
          <button className="btn btn-outline">Experiences</button>
        </div>
      </div>
      <div
        className="experience-card"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800)' }}
      >
        <div className="experience-card__content">
          <h3>Things to do from home</h3>
          <button className="btn btn-outline">Online Experiences</button>
        </div>
      </div>
    </div>
  </section>
);

export default ExperiencesSection;
