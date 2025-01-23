"use client";

import { useState, useRef } from "react";
import styles from "./slider.module.scss";

export default function Slider({ name, alt = "" }) {
  const [gradientPosition, setGradientPosition] = useState(50); // Initial pos
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    const startX = evt.clientX;
    e.preventDefault();
    // document.body.style.userSelect = "none"; // Disable selection

    const sliderContainer = sliderRef.current.parentElement;
    const containerRect = sliderContainer.getBoundingClientRect();

    const handleMouseMove = (e) => {
      const offsetX = e.clientX - containerRect.left;
      const newPosition = Math.min(
        Math.max((offsetX / containerRect.width) * 100, 0),
        100,
      );
      setGradientPosition(newPosition);
    };

    const handleMouseUp = () => {
      // document.body.style.userSelect = ""; // Re-enable selection
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className={"select-none" + styles.imageContainer}>
        <img
          src={`/images/${name}/before.png`}
          alt={alt}
          className={styles.baseImage}
        />
        <img
          src={`/images/${name}/after.png`}
          alt={alt}
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
    </div>
  );
}
