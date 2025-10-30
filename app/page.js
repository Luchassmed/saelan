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
      className="bg-white text-black flex flex-col items-center min-h-screen p-10"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold">Oskar Sælan Halskov</div>
        <div className="text-2xl">Stud.Arch. MAA</div>
        <div className="text-2xl">Arbejder som ... </div>
      </div>

      <div className="mt-8 w-full max-w-2xl flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-3">
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
        </ul>
      </div>
    </div>
  );
}
