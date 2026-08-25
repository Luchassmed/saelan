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
      // The white background is baked into the asset, so the element carries the
      // same white for the window before the first frame paints.
      className={`${widthClass} object-cover block bg-white`}
    />
  );
}
