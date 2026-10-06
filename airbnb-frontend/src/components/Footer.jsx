import './Footer.css';

const columns = [
  {
    title: 'Support',
    links: ['Help Center', 'Safety information', 'Cancellation options', 'Our COVID-19 Response', 'Supporting people with disabilities', 'Report a neighborhood concern'],
  },
  {
    title: 'Community',
    links: ['Airbnb.org: disaster relief housing', 'Support: refugees', 'Celebrating diversity & belonging', 'Combating discrimination'],
  },
  {
    title: 'Hosting',
    links: ['Try hosting', 'AirCover: protection for Hosts', 'Explore hosting resources', 'Visit our community forum', 'How to host responsibly'],
  },
  {
    title: 'About',
    links: ['Newsroom', 'Learn about new features', 'Letter from our founders', 'Careers', 'Investors', 'Airbnb Luxe'],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__columns container">
        {columns.map((col) => (
          <div key={col.title} className="footer__col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer__bottom container">
        <div className="footer__copy">
          &copy; {new Date().getFullYear()} Airbnb Clone (Capstone Project), Inc. &middot; Privacy &middot; Terms &middot; Sitemap
        </div>
        <div className="footer__meta">
          <span>🌐 English (ZA)</span>
          <span>💲 ZAR</span>
          <span>📘</span>
          <span>🐦</span>
          <span>📷</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
