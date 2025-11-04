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
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // trigger the fade-in class on pathname change for the header
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 220);
    return () => clearTimeout(t);
  }, [pathname]);

  // Note: menu should remain open once opened. We intentionally do not
  // close it on outside clicks. The only way to close is via POLYRATTAN or KONTAKT.

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white ${
        animate ? "fade-in" : ""
      }`}
    >
      <div className="h-16 flex items-center justify-between px-2 tracking-widest relative text-sm">
        <div className="relative" ref={ref}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // always open the menu (do not allow closing by clicking again)
              setShowGrid(true);
              setSelectedTop(true);
            }}
            className={`text-sm font-bold ${
              selectedTop ? "filter blur-sm opacity-60" : ""
            }`}
            aria-expanded={showGrid}
            aria-haspopup="true"
          >
            PROJEKTER.<em className="italic">PROJECTS</em>
          </button>

          {showGrid && (
            <div className="absolute z-50 top-full left-0 w-64 bg-white rounded">
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

        <Link
          href="/"
          onClick={() => {
            // clicking the logo navigates home and closes the menu
            setShowGrid(false);
            setOpenCategory(null);
            setSelectedCategory(null);
            setSelectedProject(null);
            setSelectedTop(false);
          }}
          aria-label="Go to home"
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <img
            src="/polyrattanLogo.jpg"
            alt="Polyrattan"
            className="h-10 w-auto block"
          />
        </Link>

        <div className="ml-auto">
          <button
            className="text-sm"
            onClick={() => {
              // clicking KONTAKT should close the menu (contact page not implemented yet)
              setShowGrid(false);
              setOpenCategory(null);
              setSelectedCategory(null);
              setSelectedProject(null);
              setSelectedTop(false);
            }}
          >
            KONTAKT.<em className="italic">CONTACT</em>
          </button>
        </div>
      </div>
    </header>
  );
}
