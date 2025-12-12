import { useState, useEffect, useRef } from "react";
import "./DoodleAvatar.css";

const doodleFace = "/images/character.png"; // your image in public/images

function DoodleAvatar() {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [mood, setMood] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMove = (e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const rawX = (e.clientX - cx) / (rect.width / 2);
            const rawY = (e.clientY - cy) / (rect.height / 2);
            const clamp = (v) => Math.max(-1, Math.min(1, v));

            const x = clamp(rawX);
            const y = clamp(rawY);

            // asymmetrical movement: mas konti sa right
            let xAdjusted;
            if (x < 0) {
                xAdjusted = x * 4;      // left look
            } else {
                xAdjusted = x * 2.5;    // right look (mas maikli)
            }

            // damp yung sobrang taas sa upper-left
            let yAdjusted = y;
            if (x < 0 && y < 0) {
                yAdjusted = y * 0.5;
            }

            setOffset({
                x: xAdjusted,
                y: yAdjusted * 2,
            });

            const rawMood = -yAdjusted;      // -1 (down) ... 1 (up)

            // ✅ wag na payagan maging negative: 0–1 lang
            const happyOnly = Math.max(0, rawMood);

            setMood(happyOnly);
        };

        // 👉 IMPORTANT: dapat may ganito
        const handleLeave = () => {
            setOffset({ x: 0, y: 0 });
            setMood(0);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseleave", handleLeave);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    // stronger smile curve
    const baseSmileY = 68;
    const smileCurve = 4 + mood * 4; // more curve than before
    const smilePath = `M 38 ${baseSmileY} Q 48 ${baseSmileY + smileCurve} 58 ${baseSmileY}`;

    return (
        <div ref={containerRef} className="avatar-wrapper">
            {/* your static doodle */}
            <img src={doodleFace} alt="Doodle avatar" className="avatar-img" draggable={false} />

            {/* overlay for pupils + mouth */}
            <svg className="avatar-overlay" viewBox="0 0 100 100">
                {/* pupils – small movement only */}
                <g transform={`translate(${offset.x} ${offset.y})`}>
                    <circle cx="42" cy="60" r="2" fill="#111" />
                    <circle cx="58" cy="60" r="2" fill="#111" />
                </g>

                {/* smiling mouth */}
                <path
                    d={smilePath}
                    stroke="#111"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        </div>
    );
}

export default DoodleAvatar;
