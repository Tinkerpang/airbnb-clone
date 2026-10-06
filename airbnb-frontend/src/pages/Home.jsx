import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import InspirationSection from '../components/InspirationSection';
import ExperiencesSection from '../components/ExperiencesSection';
import ShopSection from '../components/ShopSection';
import FutureGetawaysSection from '../components/FutureGetawaysSection';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Header transparent />
      <HeroBanner />
      <InspirationSection />
      <ExperiencesSection />
      <ShopSection />
      <FutureGetawaysSection />
      <Footer />
    </div>
  );
};

export default Home;
