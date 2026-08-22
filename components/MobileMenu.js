"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "../lib/categories";

// Full-screen panel used below the `lg` breakpoint. Only mounted while the menu
// is open, so the blur/accordion state resets on every open and `.fade-in` runs
// again on mount.
export default function MobileMenu({ projects = [], onClose }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedContact, setSelectedContact] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Keep the page behind the panel from scrolling while it is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Same blur-then-navigate feel as the desktop KONTAKT button.
  function handleProjectClick(e, project, categoryKey) {
    e.preventDefault();
    setSelectedProject(project.slug);
    setSelectedCategory(categoryKey);
    setTimeout(() => {
      onClose();
      router.push(`/projects/${project.slug}`);
    }, 500);
  }

  function handleContactClick() {
    setOpenCategory(null);
    setSelectedCategory(null);
    setSelectedProject(null);
    setSelectedContact(true);
    setTimeout(() => {
      onClose();
      router.push("/contact");
    }, 500);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="lg:hidden fade-in fixed inset-x-0 top-16 bottom-0 z-40 bg-white overflow-y-auto overscroll-contain tracking-widest"
    >
      <nav className="py-2 pb-[env(safe-area-inset-bottom)]">
        {CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <button
              onClick={() => {
                const next = openCategory === cat.key ? null : cat.key;
                setOpenCategory(next);
                setSelectedCategory(next);
              }}
              aria-expanded={openCategory === cat.key}
              className={`w-full text-left px-4 py-4 min-h-[44px] text-sm transition-all duration-500 ${
                selectedCategory === cat.key ? "filter blur-sm opacity-60" : ""
              }`}
            >
              {cat.label.split(".")[0]}.
              <em className="italic">{cat.label.split(".")[1]}</em>
            </button>

            {openCategory === cat.key && (
              <ul className="pb-2">
                {projects
                  .filter((p) => p.category === cat.key)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        onClick={(e) => handleProjectClick(e, p, cat.key)}
                        className={`block px-8 py-3 min-h-[44px] text-sm transition-all duration-500 ${
                          selectedProject === p.slug
                            ? "filter blur-sm opacity-60"
                            : ""
                        }`}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}

        <div className="border-t border-black/10 mx-4 my-2" />

        <button
          onClick={handleContactClick}
          className={`w-full text-left px-4 py-4 min-h-[44px] text-sm transition-all duration-500 ${
            selectedContact ? "filter blur-sm opacity-60" : ""
          }`}
        >
          KONTAKT.<em className="italic">CONTACT</em>
        </button>
      </nav>
    </div>
  );
}
