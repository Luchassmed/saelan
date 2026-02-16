"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Video from "../components/Video";

export default function Page() {
  const [showGrid, setShowGrid] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem("showHeader") === "true";
    } catch (e) {
      return false;
    }
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      try {
        localStorage.setItem("showHeader", "false");
      } catch (e) {}
      setUnlocked(false);
    }
  }, [pathname]);

  useEffect(() => {
    // keep local unlocked state in sync if user opens header elsewhere
    function onShow() {
      setUnlocked(true);
    }
    window.addEventListener("showHeader", onShow);
    function onReset() {
      try {
        localStorage.setItem("showHeader", "false");
      } catch (e) {}
      setUnlocked(false);
    }
    window.addEventListener("resetSplash", onReset);
    return () => {
      window.removeEventListener("showHeader", onShow);
      window.removeEventListener("resetSplash", onReset);
    };
  }, []);

  const handleClick = () => {
    // clicking outside should close the dropdown (no-op for now)
    setShowGrid(false);
  };

  return (
    <div
      className="bg-white text-black flex flex-col items-center justify-center flex-1 p-10 gap-20"
      onClick={handleClick}
    >
      <div className="w-full max-w-2xl h-full py-4 mx-auto flex items-center justify-center">
        {!unlocked ? (
          <div
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              // play fade-out, then reveal header and PH.jpg
              setTimeout(() => {
                try {
                  localStorage.setItem("showHeader", "true");
                } catch (e) {}
                window.dispatchEvent(new Event("showHeader"));
                setUnlocked(true);
                setIsTransitioning(false);
              }, 200);
            }}
            className={isTransitioning ? "fade-out" : ""}
          >
            <Video widthClass="w-[800px]" />
          </div>
        ) : (
          <img
            src="/PH.jpg"
            alt="Placeholder"
            className="w-full h-full object-cover rounded fade-in"
          />
        )}
      </div>
    </div>
  );
}
