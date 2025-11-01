"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllProjects } from "../lib/projects";

export default function Header() {
  const [showGrid, setShowGrid] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowGrid(false);
        setOpenCategory(null);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const projects = getAllProjects();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="h-16 flex items-center justify-around px-6">
        <div className="relative" ref={ref}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGrid((s) => !s);
            }}
            className="text-lg font-bold"
            aria-expanded={showGrid}
            aria-haspopup="true"
          >
            PROJEKTER.PROJECTS
          </button>

          {showGrid && (
            <div className="absolute z-50 top-full left-0 mt-2 w-64 bg-white rounded">
              {[
                { key: "architecture", label: "ARKITEKTUR.ARCHITECTURE" },
                { key: "illustration", label: "ILLUSTRATION.ILLUSTRATION" },
                { key: "other", label: "ANDET.OTHER" },
              ].map((cat) => (
                <div key={cat.key} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = openCategory === cat.key ? null : cat.key;
                      setOpenCategory(next);
                      // mark as selected when clicked
                      setSelectedCategory(next);
                    }}
                    className={`w-full text-left px-4 py-2 hover:underline ${
                      selectedCategory === cat.key
                        ? "filter blur-sm opacity-60"
                        : ""
                    }`}
                  >
                    {cat.label}
                  </button>
                  {openCategory === cat.key && (
                    <ul className="absolute left-full top-0 ml-2 w-56 bg-white rounded px-3 py-2 z-50">
                      {projects
                        .filter((p) => p.category === cat.key)
                        .map((p) => (
                          <li key={p.slug} className="py-1">
                            <Link
                              href={`/projects/${p.slug}`}
                              className={`text-sm hover:underline ${
                                selectedProject === p.slug
                                  ? "filter blur-sm opacity-60"
                                  : ""
                              }`}
                              onClick={() => {
                                // mark clicked project and close dropdown
                                setSelectedProject(p.slug);
                                setSelectedCategory(cat.key);
                                setShowGrid(false);
                                setOpenCategory(null);
                              }}
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-lg font-bold">POLYRATTAN</div>
        <div className="text-lg font-bold">KONTAKT.CONTACT</div>
      </div>
    </header>
  );
}
