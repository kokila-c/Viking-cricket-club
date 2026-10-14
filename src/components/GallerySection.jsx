import gallery from "../data/gallery";
import CricketIllustration from "./CricketIllustration";

export default function GallerySection({ onOpen }) {
  return (
    <section
      className="gallery-section"
      id="gallery"
      aria-labelledby="gallery-title"
    >
      <div className="gallery-container">
        <div className="gallery-header">
          <div>
            <p className="section-eyebrow">CLUB MOMENTS</p>
            <h2 id="gallery-title">Life at Viking</h2>
          </div>
          <span className="small-tag">ILLUSTRATED GALLERY</span>
        </div>
        <p className="content-note">
          Cricket illustrations for this prototype. Select a card to explore;
          club photos can be added after approval.
        </p>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button
              type="button"
              aria-label={`Open ${item.title} illustration`}
              className={`gallery-item gallery-item-${index + 1}`}
              key={item.id}
              onClick={() => onOpen(index)}
            >
              <CricketIllustration scene={item.scene} />
              <span className="gallery-caption">
                {item.title}
                <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
