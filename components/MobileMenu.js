"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "../lib/categories";

// Reads the active project/contact straight off the URL so reopening the panel
// shows the same blurred "you are here" state the desktop header keeps in
// memory. The panel unmounts on close, so there is no state to carry over.
function activeFromPath(pathname, projects) {
  if (pathname === "/contact") {
    return { contact: true, project: null, category: null };
  }
  if (pathname?.startsWith("/projects/")) {
    const raw = pathname.slice("/projects/".length);
    // usePathname keeps the URL-encoded form; slugs may contain æ/ø/å.
    let slug = raw;
    try {
      slug = decodeURIComponent(raw);
    } catch (e) {}
    const project = projects.find((p) => p.slug === slug);
    if (project) {
      return { contact: false, project: slug, category: project.category };
    }
  }
  return { contact: false, project: null, category: null };
}

// Full-screen panel used below the `lg` breakpoint. Only mounted while the menu
// is open, so the blur/accordion state resets on every open and `.fade-in` runs
// again on mount.
export default function MobileMenu({ projects = [], onClose }) {
  const pathname = usePathname();
  const [active] = useState(() => activeFromPath(pathname, projects));
  const [openCategory, setOpenCategory] = useState(active.category);
  const [selectedCategory, setSelectedCategory] = useState(active.category);
  const [selectedProject, setSelectedProject] = useState(active.project);
  const [selectedContact, setSelectedContact] = useState(active.contact);
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
    setSelectedContact(false);
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
                        aria-current={
                          selectedProject === p.slug ? "page" : undefined
                        }
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

        <button
          onClick={handleContactClick}
          aria-current={selectedContact ? "page" : undefined}
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
