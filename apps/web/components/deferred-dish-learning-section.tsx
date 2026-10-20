"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The knowledge encyclopedia includes large recipe articles. They are not
// necessary to focus the search field or open a cuisine on the first screen.
const DishLearningSection = dynamic(
  () => import("./dish-learning-section").then((module) => module.DishLearningSection),
  { ssr: false },
);

export function DeferredDishLearningSection() {
  const [visible, setVisible] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function openKnowledgeLink(): void {
      if (window.location.hash.startsWith("#learn-")) setVisible(true);
    }

    openKnowledgeLink();
    window.addEventListener("hashchange", openKnowledgeLink);

    const anchor = anchorRef.current;
    if (!anchor || !("IntersectionObserver" in window)) {
      setVisible(true);
      return () => window.removeEventListener("hashchange", openKnowledgeLink);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(anchor);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", openKnowledgeLink);
    };
  }, []);

  return <div ref={anchorRef}>{visible ? <DishLearningSection /> : null}</div>;
}
