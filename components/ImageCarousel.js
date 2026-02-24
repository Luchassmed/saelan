"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_VARIANTS = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const TRANSITION = {
  x: { type: "tween", ease: "easeInOut", duration: 0.3 },
  opacity: { duration: 0.2 },
};

const SWIPE_THRESHOLD = 50;

export default function ImageCarousel({ images = [], alt = "" }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!images || images.length === 0) {
    return null;
  }

  const isSingle = images.length === 1;

  function goTo(newIndex, newDirection) {
    setDirection(newDirection);
    setIndex(newIndex);
  }

  function prev() {
    goTo((index - 1 + images.length) % images.length, -1);
  }

  function next() {
    goTo((index + 1) % images.length, 1);
  }

  function handleDragEnd(event, info) {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      next();
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      prev();
    }
  }

  return (
    <div className="project-image rounded overflow-hidden relative select-none">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={index}
          src={images[index]}
          alt={`${alt} — ${index + 1} / ${images.length}`}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          variants={SLIDE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          drag={isSingle ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        />
      </AnimatePresence>

      {!isSingle && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="13 4 7 10 13 16" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 4 13 10 7 16" />
            </svg>
          </button>
        </>
      )}

      {!isSingle && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Go to image ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
