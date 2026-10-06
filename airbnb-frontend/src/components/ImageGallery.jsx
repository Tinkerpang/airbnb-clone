const ImageGallery = ({ images = [] }) => {
  const main = images[0];
  const rest = images.slice(1, 5);

  return (
    <div className="gallery">
      <img src={main} alt="Main listing view" className="gallery__main" />
      <div className="gallery__grid">
        {rest.map((img, i) => (
          <img key={i} src={img} alt={`Listing view ${i + 2}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
