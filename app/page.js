"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAllProjects } from "../lib/projects";

export default function Page() {
  const [showGrid, setShowGrid] = useState(false);

  const handleClick = () => {
    setShowGrid(true);
  };

  const projects = getAllProjects();

  return (
    <div
      className="bg-white text-black flex flex-col items-center min-h-screen p-10 gap-20"
      onClick={handleClick}
    >
      <div className="flex flex-row justify-around w-screen">
        <div className="text-2xl font-bold">PROJEKTER/PROJECTS</div>
        <div className="text-2xl font-bold">POLYRATTAN</div>
        <div className="text-2xl font-bold">KONTAKT.CONTACT</div>
      </div>

      <div className="w-full max-w-2xl items-center border-2 h-64 border-black py-10">
        {/* <h2 className="text-xl font-semibold mb-3">
          <Link href="/projects" className="hover:underline">
            Projekter
          </Link>
        </h2>
        <ul className="space-y-2 flex flex-col items-center">
          {projects.map((p) => (
            <li key={p.slug} className="w-auto">
              <Link href={`/projects/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
