import { useCallback, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import TeamsSection from "./components/TeamsSection";
import FixturesSection from "./components/FixturesSection";
import NewsSection from "./components/NewsSection";
import SponsorsSection from "./components/SponsorsSection";
import JoinSection from "./components/JoinSection";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import BackToTop from "./components/BackToTop";
import SectionMenu from "./components/SectionMenu";
import MembershipSection from "./components/MembershipSection";
import DemoReview from "./components/DemoReview";
import Modal from "./components/Modal";
import PrivacyNotice from "./components/PrivacyNotice";
import CricketIllustration from "./components/CricketIllustration";
import useMembershipStore from "./hooks/useMembershipStore";
import gallery from "./data/gallery";
import { demoContact } from "./data/contact";

function App() {
  const store = useMembershipStore();
  const [modal, setModal] = useState(null);
  const [joinRequest, setJoinRequest] = useState(0);
  const closeModal = useCallback(() => setModal(null), []);
  const privacy = useCallback(() => setModal({ type: "privacy" }), []);
  const review = useCallback(() => setModal({ type: "review" }), []);
  function joinTeam(team) {
    store.saveDraft({
      ...store.state.draft,
      team,
      ageGroup:
        team === "Junior Cricket" && store.state.draft.plan === "individual"
          ? "junior"
          : store.state.draft.ageGroup,
      consent: false,
    });
    setJoinRequest((value) => value + 1);
    closeModal();
  }
  function galleryStep(delta) {
    setModal((current) => ({
      type: "gallery",
      index: (current.index + delta + gallery.length) % gallery.length,
    }));
  }
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <div className="prototype-bar">
        <span>
          <span className="demo-dot" />
          PORTFOLIO DEMO · VERSION 1
        </span>
        <div>
          <a href="#membership">Try membership</a>
          <button type="button" onClick={review}>
            Demo review ↗
          </button>
        </div>
      </div>
      <main id="main">
        <Hero />
        <AboutSection />
        <TeamsSection
          onJoin={joinTeam}
          onDetails={(team) => setModal({ type: "team", team })}
        />
        <FixturesSection />
        <NewsSection onStory={(item) => setModal({ type: "story", item })} />
        <GallerySection
          onOpen={(index) => setModal({ type: "gallery", index })}
        />
        <SponsorsSection />
        <MembershipSection
          key={joinRequest}
          store={store}
          onPrivacy={privacy}
          onReview={review}
          forceApply={joinRequest > 0}
        />
        <JoinSection
          onDemoContact={(channel) => setModal({ type: "contact", channel })}
        />
      </main>
      <Footer onPrivacy={privacy} onReview={review} />
      <SectionMenu />
      <BackToTop />
      {modal && (
        <Modal
          title={
            modal.type === "privacy"
              ? "Demo privacy notice"
              : modal.type === "review"
                ? "Membership · Demo review"
                : modal.type === "contact"
                  ? "Contact · Portfolio demo"
                  : modal.type === "team"
                    ? modal.team.name
                    : modal.type === "story"
                      ? modal.item.title
                      : gallery[modal.index].title
          }
          onClose={closeModal}
          wide={modal.type === "review"}
        >
          {modal.type === "privacy" && <PrivacyNotice />}
          {modal.type === "review" && <DemoReview store={store} />}
          {modal.type === "contact" && (
            <div className="prose">
              <p className="notice">
                Fictional contact details · No message or call is made.
              </p>
              <h3>{modal.channel === "email" ? "Demo email" : "Demo phone"}</h3>
              <p className="demo-contact-value">{demoContact[modal.channel]}</p>
              <p>
                This contact card demonstrates the website’s design and
                interaction. These are example details for the portfolio, not
                the club’s real contact information.
              </p>
              <a
                className="dark-button"
                href="#membership"
                onClick={closeModal}
              >
                Try the membership demo →
              </a>
            </div>
          )}
          {modal.type === "team" && (
            <div className="prose">
              <div className="modal-art">
                <CricketIllustration
                  scene={
                    modal.team.name === "Junior Cricket"
                      ? "community"
                      : "wicket"
                  }
                />
              </div>
              <p>{modal.team.description}</p>
              <h3>Find your place</h3>
              <p>
                {modal.team.name === "Junior Cricket"
                  ? "An introduction to cricket built around fun, confidence and teamwork. A parent or guardian completes applications for players under 18."
                  : "Come with curiosity and a love of the game. Whether you are new to cricket or ready to compete, connect with the club to learn about training and team opportunities."}
              </p>
              <p>
                Training times and availability will be confirmed by the club.
              </p>
              <a
                className="dark-button"
                href="#membership"
                onClick={() => joinTeam(modal.team.name)}
              >
                Explore membership →
              </a>
            </div>
          )}
          {modal.type === "story" && (
            <article className="prose">
              <p className="notice">
                Sample club story · {modal.item.category} · {modal.item.date}
              </p>
              <div className="modal-art">
                <CricketIllustration
                  scene={modal.item.id === 2 ? "ball" : "community"}
                />
              </div>
              <p>{modal.item.description}</p>
              <p>
                {modal.item.id === 1
                  ? "A new season means new goals, new friendships and another chance to learn. This sample article shows how club news can be read without leaving the website."
                  : modal.item.id === 2
                    ? "Every new player brings something to the team. Cricket offers a place to grow in confidence, stay active and share the joy of the game. Beginners and experienced players alike are welcome."
                    : "Sport can bring people together across ages and backgrounds. At the heart of this website is a simple invitation: play, learn and belong."}
              </p>
              <p>
                Explore the example contact experience in this portfolio
                prototype.
              </p>
              <a className="dark-button" href="#contact" onClick={closeModal}>
                View demo contact →
              </a>
            </article>
          )}
          {modal.type === "gallery" && (
            <div
              className="gallery-viewer"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") galleryStep(1);
                if (event.key === "ArrowLeft") galleryStep(-1);
              }}
            >
              <div className="gallery-view-art">
                <CricketIllustration scene={gallery[modal.index].scene} />
              </div>
              <p>{gallery[modal.index].caption}</p>
              <small>
                Prototype illustration · {modal.index + 1} of {gallery.length}
              </small>
              <div className="gallery-view-controls">
                <button
                  type="button"
                  className="outline-dark-button"
                  onClick={() => galleryStep(-1)}
                  aria-label="Previous gallery illustration"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className="dark-button"
                  onClick={() => galleryStep(1)}
                  aria-label="Next gallery illustration"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
