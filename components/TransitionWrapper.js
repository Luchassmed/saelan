"use client";

import { usePathname } from "next/navigation";

export default function TransitionWrapper({ children }) {
  const pathname = usePathname();

  // Using the pathname as a key forces React to remount this wrapper on route
  // changes which causes the CSS animation to run again.
  return (
    <div key={pathname} className="fade-in">
      {children}
    </div>
  );
}
