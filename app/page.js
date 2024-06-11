"use client";

import React, { useState } from "react";

export default function Page() {
  const [showGrid, setShowGrid] = useState(false);

  const handleClick = () => {
    setShowGrid(true);
  };

  return (
    <div
      className="bg-white text-black flex flex-row items-center justify-center h-screen w-screen"
      onClick={handleClick}
    >
      {showGrid ? (
        <div className="grid grid-cols-2 gap-4">
          <p>Image 1</p>
          <p>Image 2</p>
          <p>Image 3</p>
          <p>Image 4</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold">Oskar Sælan Halskov</div>
          <div className="text-2xl">Stud.Arch. MAA</div>
        </div>
      )}
    </div>
  );
}
