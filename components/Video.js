"use client";

export default function Video({ widthClass = "w-[800px]", poster }) {
  return (
    <video
      src="/PolyrattanVideoHD.mp4"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      preload="metadata"
      className={`${widthClass} object-cover block`}
    />
  );
}
