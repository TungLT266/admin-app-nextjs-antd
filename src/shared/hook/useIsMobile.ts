"use client";
import { useEffect, useState } from "react";

/**
 * Returns true when the viewport width is below the given breakpoint (default 768px).
 * Safe for SSR – returns false until hydrated on the client.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
