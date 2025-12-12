import { useRef, useState, useEffect } from "react"; // ⬅️ added useEffect
import DoodleAvatar from "./DoodleAvatar";
import "./AboutScene.css";
import lampIcon from "./assets/lamp2.svg";
import plantIcon from "./assets/plant.svg";
import beeIcon from "./assets/bee.svg";
import radioIcon from "./assets/radio.svg";
import note1Icon from "./assets/note1.svg";
import note2Icon from "./assets/note2.svg";
import note3Icon from "./assets/note3.svg";

/* ==== NOTE ICON (3 SVG assets) ==== */
function NoteIcon({ variant }) {
    let src;
    if (variant === 0) src = note1Icon;
    else if (variant === 1) src = note2Icon;
    else src = note3Icon;
    return <img src={src} alt="" className="music-note-img" draggable={false} />;
}

/* ==== RADIO (bottom shelf, center) ==== */
function RadioButton() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [noteSeeds] = useState(() =>
        Array.from({ length: 3 }, (_, i) => ({
            delay: i * 1.4,
            duration: 3.4 + Math.random(),
            offsetX: -10 + Math.random() * 18,
            scale: 0.9 + Math.random() * 0.3,
            icon: i % 3,
        }))
    );

    const toggleRadio = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) audio.pause();
        else {
            audio.loop = true;
            audio.play();
        }
        setIsPlaying((prev) => !prev);
    };

    return (
        <div className="radio-wrapper">
            <button
                type="button"
                className={`radio-btn ${isPlaying ? "radio-btn--on" : ""}`}
                onClick={toggleRadio}
                aria-label={isPlaying ? "Pause radio" : "Play radio"}
            >
                <img src={radioIcon} alt="Radio" className="radio-btn-img" draggable={false} />
            </button>
            <audio ref={audioRef} src="/sounds/pastelsunset.mp3" />
            {isPlaying && (
                <div className="music-notes">
                    {noteSeeds.map((note, index) => (
                        <div
                            key={index}
                            className="music-note"
                            style={{
                                left: `${note.offsetX}px`,
                                animationDelay: `${note.delay}s`,
                                animationDuration: `${note.duration}s`,
                            }}
                        >
                            <div style={{ transform: `scale(${note.scale})` }}>
                                <NoteIcon variant={note.icon} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ==== PLANT + BEE ON HOVER ==== */
function PlantWithBee() {
    const [showBee, setShowBee] = useState(false);
    return (
        <div className="plant-slot" onMouseEnter={() => setShowBee(true)} onMouseLeave={() => setShowBee(false)}>
            {showBee && (
                <div className="bee-flight">
                    <div className="bee-wiggle">
                        <img src={beeIcon} alt="Bee" className="bee-img" draggable={false} />
                    </div>
                </div>
            )}
            <img src={plantIcon} alt="Plant" className="scene-plant-img" draggable={false} />
        </div>
    );
}

function AboutScene({ isDark, onToggleDark }) {
    const aboutRef = useRef(null); // ⬅️ added ref for the About section

    const [activePlaylist, setActivePlaylist] = useState(null);
    const closePlaylist = () => setActivePlaylist(null);

    // ⬅️ NEW: close the Spotify modal when the About section is no longer in view
    useEffect(() => {
        const target = aboutRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setActivePlaylist(null); // hide overlay if we scroll away from About
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    const books = [
        { id: 1, cover: "/images/book1-cover.jpg", full: "/images/book1.png" },
        { id: 2, cover: "/images/book2-cover.jpg", full: "/images/book2.png" },
        { id: 3, cover: "/images/book3-cover.jpg", full: "/images/book3.png" },
        { id: 4, cover: "/images/book4-cover.jpg", full: "/images/book4.png" },
        { id: 5, cover: "/images/book5-cover.jpg", full: "/images/book5.png" },
    ];
    const [hoveredBook, setHoveredBook] = useState(null);

    return (
        <div ref={aboutRef} className={`about-scene ${isDark ? "dark-mode" : ""}`}>
            {/* top hanger bar */}
            <div className="scene-hanger" />

            {/* VINYL PORTRAIT 1 -> opens embedded Spotify */}
            <button
                type="button"
                className="vinyl-frame vinyl-frame-1"
                onClick={() => setActivePlaylist("vinyl1")}
                aria-label="Open vinyl playlist 1"
            >
                <img src="/images/vinyl1.png" alt="Vinyl portrait 1" className="vinyl-img" draggable={false} />
            </button>

            {/* VINYL PORTRAIT 2 */}
            <button
                type="button"
                className="vinyl-frame vinyl-frame-2"
                onClick={() => setActivePlaylist("vinyl2")}
                aria-label="Open vinyl playlist 2"
            >
                <img src="/images/vinyl2.png" alt="Vinyl portrait 2" className="vinyl-img" draggable={false} />
            </button>

            {/* TOP SHELF: doodle frame + big lamp */}
            <div className="scene-shelf scene-shelf-top">
                <div className="scene-frame">
                    <DoodleAvatar />
                </div>

                <button type="button" className="scene-lamp-btn" onClick={onToggleDark} aria-label="Toggle dark mode">
                    <div className="scene-lamp-light" />
                    <img src={lampIcon} alt="Lamp" className="scene-lamp-img" draggable={false} />
                </button>
            </div>

            {/* BOTTOM SHELF: book — radio — plant */}
            <div className="scene-shelf scene-shelf-bottom">
                {/* BOOKS: tight spines with hover full-cover preview */}
                <div className="book-slot" aria-hidden={false}>
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="book-item"
                            tabIndex={0}
                            onMouseEnter={() => setHoveredBook(book.id)}
                            onMouseLeave={() => setHoveredBook(null)}
                            onFocus={() => setHoveredBook(book.id)}
                            onBlur={() => setHoveredBook(null)}
                        >
                            {/* small spine shown on shelf */}
                            <img src={book.cover} alt={`Book ${book.id}`} className="book-spine" draggable={false} />

                            {/* full cover — hidden by default, shown on hover */}
                            <img
                                src={book.full}
                                alt=""
                                className={`book-full ${hoveredBook === book.id ? "is-visible" : ""}`}
                                draggable={false}
                                aria-hidden={hoveredBook === book.id ? "false" : "true"}
                            />
                        </div>
                    ))}
                </div>

                <RadioButton />
                <PlantWithBee />
            </div>

            {/* ===== SPOTIFY MODAL OVERLAY ===== */}
            {activePlaylist && (
                <div className="playlist-overlay" onClick={closePlaylist} role="dialog" aria-modal="true">
                    <div className={`playlist-modal playlist-modal--${activePlaylist}`} onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="playlist-close-btn" onClick={closePlaylist} aria-label="Close playlist">
                            ✕
                        </button>

                        {activePlaylist === "vinyl1" && (
                            <iframe
                                title="Spotify playlist – vinyl 1"
                                data-testid="embed-iframe"
                                style={{ borderRadius: "12px" }}
                                src="https://open.spotify.com/embed/album/0smVmhS3IydwUGvC8qYA9v?utm_source=generator"
                                width="90%"
                                height="150"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            />
                        )}

                        {activePlaylist === "vinyl2" && (
                            <iframe
                                title="Spotify playlist – vinyl 2"
                                style={{ borderRadius: "12px" }}
                                src="https://open.spotify.com/embed/album/35UJLpClj5EDrhpNIi4DFg?utm_source=generator"
                                width="90%"
                                height="150"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AboutScene;
