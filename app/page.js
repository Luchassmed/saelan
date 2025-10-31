"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAllProjects } from "../lib/projects";

export default function Page() {
  const [showGrid, setShowGrid] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const handleClick = () => {
    // clicking outside should close the dropdown
    setShowGrid(false);
  };

  const projects = getAllProjects();

  return (
    <div
      className="bg-white text-black flex flex-col items-center justify-center flex-1 p-10 gap-20"
      onClick={handleClick}
    >
      <div className="w-full max-w-2xl h-full py-4 mx-auto flex items-center justify-center">
        <img
          src="/PH.jpg"
          alt="Video placeholder"
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
}
