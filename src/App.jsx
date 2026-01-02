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
  const portfolioRef = useRef(null);
  const navRef = useRef(null);
  const carouselRef = useRef(null);
  const ELECSEER_IMAGES = [
    { src: "/images/Ephoto3.jpg", date: "12.09.2023" },
    { src: "/images/Ephoto4.jpg", date: "18.09.2023" },
    { src: "/images/Ephoto5.jpg", date: "21.09.2023" },
    { src: "/images/Ephoto6.jpg", date: "25.09.2023" },
    { src: "/images/Ephoto7.jpg", date: "30.09.2023" },
    { src: "/images/Ephoto2.jpg", date: "30.09.2023" },
  ];
  const ARSEMBLE_IMAGES = [
    { src: "/images/Ephoto3.jpg", date: "12.09.2023" },
    { src: "/images/Ephoto4.jpg", date: "18.09.2023" },
    { src: "/images/Ephoto5.jpg", date: "21.09.2023" },
    { src: "/images/Ephoto6.jpg", date: "25.09.2023" },
    { src: "/images/Ephoto7.jpg", date: "30.09.2023" },
    { src: "/images/Ephoto2.jpg", date: "30.09.2023" },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const openPreview = (src) => {
    setPreviewImage(src);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (previewImage) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [previewImage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // portfolio wheel effect
  useEffect(() => {
    const el = portfolioRef.current;
    if (!el) return;

    let locked = false;

    const onWheel = (e) => {
      if (locked) return;

      const slides = el.querySelectorAll(".portfolio-slide");
      const slideHeight = window.innerHeight;
      const index = Math.floor(el.scrollTop / slideHeight);

      if (e.deltaY > 0 && index < slides.length - 1) {
        e.preventDefault();
        locked = true;
        el.scrollTo({
          top: (index + 1) * slideHeight,
          behavior: "smooth",
        });
        setTimeout(() => (locked = false), 600);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
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

  useEffect(() => {
    const cursor = document.getElementById("portfolio-cursor");
    const portfolio = portfolioRef.current;

    if (!cursor || !portfolio) return;

    const moveCursor = (e) => {
      // ❌ block cursor outside Portfolio
      if (!portfolio.matches(":hover")) return;

      const x = e.clientX;
      const y = e.clientY;

      cursor.style.transform = `
    translate(${x}px, ${y}px)
    translate(-50%, -50%)
  `;

      const reveal = document.querySelector(".reveal-text");
      const container = document.querySelector(".spotlight-text");
      if (!reveal || !container) return;

      const MAGNIFY_Y_OFFSET = -15;

      const rect = container.getBoundingClientRect();
      const height = rect.height;

      const localX = x - rect.left;
      const localY = y - rect.top + MAGNIFY_Y_OFFSET;

      const clampedY = Math.max(0, Math.min(localY, height));

      reveal.style.setProperty("--x", `${localX}px`);
      reveal.style.setProperty("--y", `${clampedY}px`);
    };

    const createParticles = (x, y) => {
      const particleCount = 16;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "cursor-particle";

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

        document.body.appendChild(particle);

        particle.addEventListener("animationend", () => {
          particle.remove();
        });
      }
    };

    const showCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      cursor.style.transform = `
    translate(${x}px, ${y}px)
    translate(-50%, -50%)
    scale(1)
  `;

      cursor.style.opacity = "1";
    };


    const hideCursor = () => {
      cursor.style.opacity = "0";
    };

    const handleClick = (e) => {
      if (!portfolio.matches(":hover")) return;

      cursor.style.transform = `
      translate(${e.clientX}px, ${e.clientY}px)
      translate(-50%, -50%)
      scale(0)
    `;
      cursor.style.opacity = "0";

      createParticles(e.clientX, e.clientY);

      setTimeout(() => {
        cursor.style.opacity = "1";
        cursor.style.transform = `
        translate(${e.clientX}px, ${e.clientY}px)
        translate(-50%, -50%)
        scale(1)
      `;
      }, 220);
    };

    portfolio.addEventListener("mouseenter", showCursor);
    portfolio.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleClick);

    return () => {
      portfolio.removeEventListener("mouseenter", showCursor);
      portfolio.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
    };
  }, []);

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
      <div className="navigation" ref={navRef}>
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
      <div
        id="Portfolio"
        ref={portfolioRef}
        className="snap-section portfolio-root"
      >

        {/* ================== PROJECT 1: ELECSEER ================== */}
        <section className="portfolio-slide hero">
          <div className="project-header">
            <h1 className="project-title">Elecseer</h1>

            <div className="tech-tags">
              <span>Arduino Uno</span>
              <span>Firebase</span>
              <span>Tailwind</span>
            </div>
          </div>

          <div className="project-body">
            <div className="project-media">
              <img
                src="/images/Ephoto8.png"
                alt="Elecseer overview"
                className="hero-image"
              />
            </div>

            <div className="project-info">
              <div className="spotlight-text">
                <p className="project-desc base-text">
                  Elecseer is a hardware–cloud integrated system that
                  connects Arduino-based
                  devices with Firebase services, enabling real-time
                  interaction and
                  monitoring for smart automation and educational use cases.
                </p>

                <p className="project-desc reveal-text">
                  Elecseer is a hardware–cloud integrated system that
                  connects Arduino-based
                  devices with Firebase services, enabling real-time
                  interaction and
                  monitoring for smart automation and educational use cases.
                </p>
              </div>
              <p className="project-role">
                <strong>Role:</strong> Frontend Developer
              </p>
              <div className="project-carousel-preview">
                <div className="mini-carousel">
                  {[...ELECSEER_IMAGES, ...ELECSEER_IMAGES].map((item, i) => (
                    <div
                      className="mini-carousel-item"
                      key={`elecseer-${i}`}
                      onClick={() => openPreview(item.src)}
                    >
                      <img src={item.src} alt={`elecseer-${i}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================== PROJECT 2: DUPLICATE ================== */}
        <section className="portfolio-slide hero">
          <div className="project-header">
            <h1 className="project-title">ARsemble</h1>

            <div className="tech-tags">
              <span>Unity</span>
              <span>Firebase</span>
              <span>Gemini</span>
            </div>
          </div>

          <div className="project-body">
            <div className="project-media">
              <img
                src="/images/Ephoto9.png"
                alt="Project overview"
                className="hero-image"
              />
            </div>

            <div className="project-info">
              <p className="project-desc">
                YOUR PROJECT DESCRIPTION HERE.
              </p>
              <p className="project-role">
                <strong>Role:</strong> Team Leader, Lead Developer
              </p>
              <div className="project-carousel-preview">
                <div className="mini-carousel">
                  {[...ARSEMBLE_IMAGES, ...ARSEMBLE_IMAGES].map((item, i) => (
                    <div
                      className="mini-carousel-item"
                      key={`project2-${i}`}
                      onClick={() => openPreview(item.src)}
                    >
                      <img src={item.src} alt={`project2-${i}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

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

      {/* PORTFOLIO CUSTOM CURSOR */}
      <div id="portfolio-cursor" />

      {/* IMAGE PREVIEW MODAL — ADD HERE */}
      {previewImage && (
        <div className="image-modal" onClick={closePreview}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="image-modal-close"
              onClick={closePreview}
            >
              ×
            </button>
            <img src={previewImage} alt="Preview" />
          </div>
        </div>
      )}

    </div>
  );
}

function App() {
  return <HomePage />;
}

export default App;
