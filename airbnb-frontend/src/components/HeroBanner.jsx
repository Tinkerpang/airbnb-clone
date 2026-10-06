import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <img
        className="hero__image"
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
        alt="Beautiful South African home"
      />
      <div className="hero__overlay">
        <h1>Not sure where to go? Perfect.</h1>
        <button className="btn hero__cta" onClick={() => navigate('/search')}>
          I&apos;m flexible
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
