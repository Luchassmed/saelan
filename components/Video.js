// app/components/PolyrattanMaskedVideo.jsx
"use client";

export default function PolyrattanMaskedVideo({
  widthClass = "w-[800px]",
  aspect = 1.444, // your mask's width/height
  focalX = "50%", // 0%..100% (left..right)
  focalY = "50%", // 0%..100% (top..bottom)
  zoom = 1.0, // e.g. 1.1 to zoom in a bit
  poster,
}) {
  return (
    <div
      className={`overflow-hidden polyrattan-mask ${widthClass}`}
      style={{ aspectRatio: aspect }}
      aria-label="Logo-shaped video"
    >
      <video
        src="/polyrattanVideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
        className="w-full h-full object-cover block"
        style={{
          objectPosition: `${focalX} ${focalY}`,
          transform: zoom !== 1 ? `scale(${zoom})` : undefined,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
