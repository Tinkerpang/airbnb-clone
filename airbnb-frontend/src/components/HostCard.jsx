const HostCard = ({ hostName }) => (
  <section className="host-card">
    <div className="host-card__avatar">{hostName?.[0] || 'H'}</div>
    <div>
      <h3>Hosted by {hostName}</h3>
      <p>Joined May 2024</p>
      <p>⭐ 12 Reviews &middot; ✔ Identity verified &middot; 🏅 Superhost</p>
      <p className="host-card__blurb">
        Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
      </p>
      <p>Response rate: 100%</p>
      <p>Response time: within an hour</p>
      <button className="btn btn-outline">Contact Host</button>
    </div>
  </section>
);

export default HostCard;
