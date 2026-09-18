function GallerySection() {
  const galleryItems = [
    { id: 1, title: "Match Day" },
    { id: 2, title: "Women's Cricket" },
    { id: 3, title: "Training" },
    { id: 4, title: "Junior Cricket" },
    { id: 5, title: "Club Events" },
  ];

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <div>
            <p className="section-eyebrow">CLUB MOMENTS</p>
            <h2>Life at Viking</h2>
          </div>

          <a href="#gallery" className="view-gallery">
            View Gallery →
          </a>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div
              className={`gallery-item gallery-item-${index + 1}`}
              key={item.id}
            >
              <div className="gallery-placeholder">
                <span>Photo</span>
              </div>

              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
