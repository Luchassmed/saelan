"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getAllProjects } from "../lib/projects";

export default function Header() {
  const [showGrid, setShowGrid] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTop, setSelectedTop] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowGrid(false);
        setOpenCategory(null);
        setSelectedTop(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Reset selected/active state only when returning to the home page so blurs
  // are cleared when you go back to the main view, but persist while on project pages.
  useEffect(() => {
    if (pathname === "/") {
      setShowGrid(false);
      setOpenCategory(null);
      setSelectedCategory(null);
      setSelectedProject(null);
      setSelectedTop(false);
    }
  }, [pathname]);

  const projects = getAllProjects();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="h-16 flex items-center justify-between px-2 tracking-widest">
        <div className="relative" ref={ref}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowGrid((s) => {
                const next = !s;
                setSelectedTop(next);
                return next;
              });
            }}
            className={`text-lg font-bold ${
              selectedTop ? "filter blur-sm opacity-60" : ""
            }`}
            aria-expanded={showGrid}
            aria-haspopup="true"
          >
            PROJEKTER.<em className="italic">PROJECTS</em>
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
                    className={`w-full text-left px-4 py-2 ${
                      selectedCategory === cat.key
                        ? "filter blur-sm opacity-60"
                        : ""
                    }`}
                  >
                    {cat.label.split(".")[0]}.{""}
                    <em className="italic">{cat.label.split(".")[1]}</em>
                  </button>
                  {openCategory === cat.key && (
                    <ul className="absolute left-full top-0 ml-2 w-56 bg-white rounded px-3 py-2 z-50">
                      {projects
                        .filter((p) => p.category === cat.key)
                        .map((p) => (
                          <li key={p.slug} className="py-1">
                            <Link
                              href={`/projects/${p.slug}`}
                              className={`text-sm ${
                                selectedProject === p.slug
                                  ? "filter blur-sm opacity-60"
                                  : ""
                              }`}
                              onClick={() => {
                                // mark clicked project but do NOT close the dropdown;
                                // dropdown will only close when clicking outside
                                setSelectedProject(p.slug);
                                setSelectedCategory(cat.key);
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

        <div className="text-lg">POLYRATTAN</div>
        <div className="text-lg">
          KONTAKT.<em className="italic">CONTACT</em>
        </div>
      </div>
    </header>
  );
}
