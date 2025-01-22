"use client";

import { useState, useRef } from "react";
import styles from "./Home.module.css";

export default function Home() {
    const [gradientPosition, setGradientPosition] = useState(50); // Initial pos
    const sliderRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        document.body.style.userSelect = "none"; // Disable selection

        const sliderContainer = sliderRef.current.parentElement;
        const containerRect = sliderContainer.getBoundingClientRect();

        const handleMouseMove = (e) => {
            const offsetX = e.clientX - containerRect.left;
            const newPosition = Math.min(Math.max((offsetX / containerRect.width) * 100, 0), 100);
            setGradientPosition(newPosition);
        };

        const handleMouseUp = () => {
            document.body.style.userSelect = ""; // Re-enable selection
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            className={styles.imageContainer}
            style={{ width: "100%", height: "auto", overflow: "hidden" }} // Ensure iframe-safe styling
        >
            <img src="/images/before.png" alt="Gray background" className={styles.baseImage} />
            <img
                src="/images/after.png"
                alt="Color overlay"
                className={styles.overlayImage}
                style={{
                    WebkitMaskImage: `linear-gradient(to right, black ${gradientPosition}%, transparent ${gradientPosition}%)`,
                    maskImage: `linear-gradient(to right, black ${gradientPosition}%, transparent ${gradientPosition}%)`,
                }}
            />
            <div
                ref={sliderRef}
                className={styles.slider}
                style={{ left: `${gradientPosition}%` }}
                onMouseDown={handleMouseDown}
            ></div>
        </div>
    );
}
