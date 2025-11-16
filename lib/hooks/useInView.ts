import { useEffect, useState } from "react";

export function useInView(elementId: string) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // When 10% of the element is visible
        rootMargin: "-80px 0px 0px 0px", // Offset for fixed header
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId]);

  return isInView;
}
