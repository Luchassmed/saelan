"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { CATEGORIES } from "../lib/categories";

// Matches the carousel arrows so the icon set stays consistent.
const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export default function Header({ projects = [] }) {
  const [showGrid, setShowGrid] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTop, setSelectedTop] = useState(false);
  const [selectedContact, setSelectedContact] = useState(false);
  // Mobile menu keeps its own open state: both branches are always mounted, so
  // sharing showGrid/openCategory would couple a mobile tap to the hidden
  // desktop tree.
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  const resetAll = useCallback(() => {
    setShowGrid(false);
    setOpenCategory(null);
    setSelectedCategory(null);
    setSelectedProject(null);
    setSelectedTop(false);
    setSelectedContact(false);
    setMenuOpen(false);
    try {
      localStorage.setItem("showHeader", "false");
    } catch (e) {}
    setVisible(false);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    // trigger the fade-in class on pathname change for the header
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 220);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    // also animate when visibility toggles (e.g., when splash is dismissed)
    if (visible) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 220);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [visible]);

  useEffect(() => {
    // For non-home routes, always show the header (handles direct visits)
    if (pathname !== "/") {
      setVisible(true);
    } else {
      // For home page, respect localStorage (preserves splash behavior)
      try {
        if (localStorage.getItem("showHeader") === "true") {
          setVisible(true);
        }
      } catch (e) {
        // ignore (SSR safety)
      }
    }

    const handler = () => setVisible(true);
    window.addEventListener("showHeader", handler);
    return () => window.removeEventListener("showHeader", handler);
  }, [pathname]);

  // Close the mobile panel on any navigation (covers browser back/forward).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // If the viewport grows past the breakpoint the mobile toggle disappears, so
  // close the panel to avoid leaving the body scroll locked.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Note: on desktop the menu should remain open once opened. We intentionally
  // do not close it on outside clicks. The only way to close is via POLYRATTAN
  // or KONTAKT. The mobile panel is dismissible (close icon, Escape, logo, or
  // picking a project).

  // Reset selected/active state only when returning to the home page so blurs
  // are cleared when you go back to the main view, but persist while on project pages.
  useEffect(() => {
    if (pathname === "/") {
      resetAll();
    }
  }, [pathname, resetAll]);

  function handleLogoClick() {
    // clicking the logo navigates home and closes the menu
    resetAll();
    try {
      window.dispatchEvent(new Event("resetSplash"));
    } catch (e) {}
  }

  function handleContactClick() {
    setShowGrid(false);
    setOpenCategory(null);
    setSelectedCategory(null);
    setSelectedProject(null);
    setSelectedTop(false);
    setSelectedContact(true);
    setTimeout(() => router.push("/contact"), 500);
  }

  if (!visible) return null;

  const logo = (
    <img
      src="/polyrattanLogo.jpg"
      alt="Polyrattan"
      className="h-6 w-24 md:h-10 md:w-auto block"
    />
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white ${
        animate ? "fade-in" : ""
      }`}
    >
      {/* Desktop (>= lg) — unchanged layout and behaviour */}
      <div className="hidden lg:flex h-16 items-center justify-between px-2 tracking-widest relative text-sm">
        <div className="relative" ref={ref}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // always open the menu (do not allow closing by clicking again)
              setShowGrid(true);
              setSelectedTop(true);
            }}
            className={`text-sm font-bold transition-all duration-500 ${
              selectedTop ? "filter blur-sm opacity-60" : ""
            }`}
            aria-expanded={showGrid}
            aria-haspopup="true"
          >
            PROJEKTER.<em className="italic">PROJECTS</em>
          </button>

          {showGrid && (
            <div className="absolute z-50 top-full left-0 w-64 bg-white rounded">
              {CATEGORIES.map((cat) => (
                <div key={cat.key} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const next = openCategory === cat.key ? null : cat.key;
                      setOpenCategory(next);
                      // mark as selected when clicked
                      setSelectedCategory(next);
                    }}
                    className={`w-full text-left px-4 py-2 transition-all duration-500 ${
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
                              className={`text-sm transition-all duration-500 ${
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
          onClick={handleLogoClick}
          aria-label="Go to home"
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          {logo}
        </Link>

        <div className="ml-auto">
          <button
            className={`text-sm transition-all duration-500 ${
              selectedContact ? "filter blur-sm opacity-60" : ""
            }`}
            onClick={handleContactClick}
          >
            KONTAKT.<em className="italic">CONTACT</em>
          </button>
        </div>
      </div>

      {/* Mobile / tablet (< lg) — logo plus a single MENU toggle. Same h-16 so
          the layout's pt-16 and every calc(… - 4rem) stay correct. */}
      <div className="flex lg:hidden h-16 items-center px-2 tracking-widest relative text-sm">
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Go to home"
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          {logo}
        </Link>

        <button
          className="ml-auto min-h-[44px] px-3 flex items-center justify-center"
          aria-expanded={menuOpen}
          aria-haspopup="true"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg {...ICON_PROPS}>
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          ) : (
            <svg {...ICON_PROPS}>
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && <MobileMenu projects={projects} onClose={closeMenu} />}
    </header>
  );
}
