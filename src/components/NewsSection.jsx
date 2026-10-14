import { useState } from "react";
import news from "../data/news";
import CricketIllustration from "./CricketIllustration";

export default function NewsSection({ onStory }) {
  const [filter, setFilter] = useState("All stories");
  const categories = [
    "All stories",
    ...new Set(news.map((item) => item.category)),
  ];
  return (
    <section className="news-section" id="news" aria-labelledby="news-title">
      <div className="news-container">
        <div className="news-header">
          <div>
            <p className="section-eyebrow">LATEST STORIES</p>
            <h2 id="news-title">From the Club</h2>
          </div>
          <span className="small-tag">SAMPLE STORIES</span>
        </div>
        <div
          className="filter-buttons filter-light"
          role="group"
          aria-label="Filter news"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="news-grid" aria-live="polite">
          {news
            .filter(
              (item) => filter === "All stories" || item.category === filter,
            )
            .map((item) => (
              <article className="news-card" key={item.id}>
                <div className="news-art">
                  <CricketIllustration
                    scene={
                      item.id === 2
                        ? "ball"
                        : item.id === 3
                          ? "community"
                          : "wicket"
                    }
                  />
                </div>
                <div className="news-card-content">
                  <div className="news-meta">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button
                    type="button"
                    className="read-more"
                    onClick={() => onStory(item)}
                  >
                    Read story →
                  </button>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
