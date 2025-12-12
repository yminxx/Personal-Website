import { useEffect, useState, useRef } from "react";
import "./index.css";
import AboutScene from "./AboutScene";

const CERTIFICATES = [
  {
    id: "cert1",
    title: "Block Bytes: Blockchain 101 for Students",
    image: "/images/cert1.png",
    description: "Short description of certificate 1.",
  },
  {
    id: "cert2",
    title: "National AI Student Challenge (NAISC) 2025 - AWS Regional LLM League",
    image: "/images/cert2.png",
    description: "Short description of certificate 2.",
  },
  {
    id: "cert3",
    title: "DevJourney: Mapping the Developer’s Career",
    image: "/images/cert3.png",
    description: "Short description of certificate 3.",
  },
  {
    id: "cert4",
    title: "Generative AI and its Implication",
    image: "/images/cert4.png",
    description: "Short description of certificate 3.",
  },
  {
    id: "cert5",
    title: "Across the Cyber-Verse: With Great Power Comes Great Cyber-Responsibility",
    image: "/images/cert5.png",
    description: "Short description of certificate 3.",
  },
];

function HomePage() {
  const [showFloating, setShowFloating] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const certSectionRef = useRef(null);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionEl = certSectionRef.current;
    if (!sectionEl) return;

    let isThrottled = false;

    const handleWheel = (e) => {
      const rect = sectionEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView || isThrottled) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 5) return;

      const goingDown = delta > 0;
      const lastIndex = CERTIFICATES.length - 1;

      if (goingDown) {
        if (activeCertIndex < lastIndex) {
          e.preventDefault();
          setActiveCertIndex((prev) => Math.min(prev + 1, lastIndex));
        } else {
          const contacts = document.getElementById("Footer-Info");
          if (contacts) {
            e.preventDefault();
            window.scrollTo({
              top: contacts.offsetTop - 120,
              behavior: "smooth",
            });
          }
        }
      } else {
        if (activeCertIndex > 0) {
          e.preventDefault();
          setActiveCertIndex((prev) => Math.max(prev - 1, 0));
        } else {
          const portfolio = document.getElementById("Portfolio");
          if (portfolio) {
            e.preventDefault();
            window.scrollTo({
              top: portfolio.offsetTop - 120,
              behavior: "smooth",
            });
          }
        }
      }

      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 350);
    };

    sectionEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => sectionEl.removeEventListener("wheel", handleWheel);
  }, [activeCertIndex]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = async () => {
    try {
      const websiteURL = window.location.href;
      await navigator.clipboard.writeText(websiteURL);
      alert("Website URL copied to clipboard.");
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <div
      className={`home-root ${isDark ? "dark-mode" : "light-mode"
        } ${hasLoaded ? "home-enter" : ""}`}
    >
      {/* navigation */}
      <div className="navigation">
        <a href="#About">
          <img src="/images/logo1.png" className="logo" alt="Logo" />
        </a>
        <a href="https://.com" target="_blank" rel="noreferrer">
          <span className="name">ysagabriellecervantes</span>
        </a>
        <nav className="nav">
          <a href="#Portfolio">Portfolio</a>
          <a
            href="/YSA_GABRIELLE_CERVANTES_RESUME.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <a href="#Footer">Contacts</a>
          <a
            href="mailto:ysagabrielle.cervantes@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard();
            }}
            title="Copy Website URL"
          >
            <i className="fa-solid fa-link"></i>
          </a>
        </nav>
      </div>

      {/* scroll-to-top button */}
      {showFloating && (
        <div
          className="floating"
          role="button"
          aria-label="Scroll to top"
          tabIndex={0}
          onClick={scrollToTop}
        >
          <i className="fa-solid fa-caret-up"></i>
        </div>
      )}

      {/* ABOUT */}
      <div id="About" className="snap-section" style={{ height: "100vh" }}>
        <div className="left">
          <h2 className="about-intro">Hi, I&apos;m Ysa.</h2>
          <p>
            I build things mostly for fun—little ideas that pop in my head and
            somehow end up turning into websites, designs, or tiny experiments
            at 2 AM. I love bringing concepts to life, whether it’s something
            playful, something useful, or something beautifully unnecessary.
          </p>
          <p>
            So basically, every project I make is a small piece of how I see the
            world: full of stories, quiet details, and has the kind of <br /> magic you
            only notice when you slow down.
          </p>
        </div>
        <div className="right">
          <AboutScene
            isDark={isDark}
            onToggleDark={() => setIsDark((prev) => !prev)}
          />
        </div>
      </div>

      {/* PORTFOLIO */}
      <div id="Portfolio" className="snap-section" style={{ height: "100vh" }}>
        <h2>portfolio.</h2>
        <p>This is the Portfolio section. Replace this with your projects.</p>
      </div>

      {/* CERTIFICATES */}
      <div id="Cert" className="snap-section" ref={certSectionRef} style={{ height: "100vh" }}>
        <div className="cert-section-inner">

          {/* LEFT COLUMN — heading + list */}
          <div className="cert-left">
            <h2 className="cert-heading">certificates.</h2>

            <div className="cert-list">
              {CERTIFICATES.map((cert, index) => (
                <button
                  key={cert.id}
                  type="button"
                  className={
                    "cert-title-btn" + (index === activeCertIndex ? " active" : "")
                  }
                  onClick={() => setActiveCertIndex(index)}
                >
                  <span className="cert-dot" />
                  <span className="cert-title-text">{cert.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — certificate preview + description */}
          <div className="cert-detail">
            <div className="cert-image-wrapper">
              <img
                src={CERTIFICATES[activeCertIndex].image}
                alt={CERTIFICATES[activeCertIndex].title}
                className="cert-image"
              />
            </div>

            <p className="cert-description">
              {CERTIFICATES[activeCertIndex].description}
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER INFO */}
      <div id="Footer-Info" className="snap-section">
        <div className="footer-left">
          <p>
            <i className="fa-solid fa-location-dot"></i>Technological Institute
            of the Philippines-Manila
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> 0955 048 0018
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>{" "}
            <a href="mailto:ysagabrielle.cervantes@gmail.com">
              ysagabrielle.cervantes@gmail.com
            </a>
          </p>
        </div>
        <div className="footer-right">
          <p className="connect">Let&apos;s Connect!</p>
          <p className="description">
            Again I&apos;m Ysa, an IT enthusiast, and I&apos;m passionate about
            the world of technology. Whether you&apos;re here to learn,
            collaborate, or just connect, I’d love to hear from you! Feel free
            to reach out through any of the channels below.
          </p>
          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div id="Footer">
        <div className="footer-content">
          <p className="copyright">©Copyright 2024.</p>
          <p className="developer">Developed by Ysa Gabrielle Cervantes</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <HomePage />;
}

export default App;
