import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function NewsSection() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function fetchNews() {
      const querySnapshot = await getDocs(collection(db, "news"));

      const newsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNews(newsData);
    }

    fetchNews();
  }, []);
  return (
    <section className="news-section" id="news">
      <div className="news-container">
        <div className="news-header">
          <div>
            <p className="section-eyebrow">LATEST STORIES</p>
            <h2>From the Club</h2>
          </div>

          <a href="#news" className="view-all-news">
            View All News →
          </a>
        </div>

        <div className="news-grid">
          {news.map((item) => (
            <article className="news-card" key={item.id}>
              <div className="news-image-placeholder">News Image</div>

              <div className="news-card-content">
                <div className="news-meta">
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <a href="#news" className="read-more">
                  Read Story →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
