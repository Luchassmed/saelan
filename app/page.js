"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [showGrid, setShowGrid] = useState(false);

  const handleClick = () => {
    setShowGrid(true);
  };

  const gallery = [
    {
      id: 1,
      logo: <img src="/PH.jpg" />,
    },
    {
      id: 2,
      logo: <img src="/PH.jpg" />,
    },
    {
      id: 3,
      logo: <img src="/PH.jpg" />,
    },
  ];

  return (
    <div
      className="bg-white text-black flex flex-row items-center justify-center h-screen w-screen"
      onClick={handleClick}
    >
      {showGrid ? (
        <div className="grid grid-cols-2 h-screen w-screen p-32">
          {gallery.map((items, i) => {
            return <div key={i}>{items.logo}</div>;
          })}
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
