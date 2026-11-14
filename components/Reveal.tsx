"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  id?: string;
  style?: CSSProperties;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  as = "div",
  id,
  style,
  delay,
}: Props) {
  const ref = useRef<HTMLDivElement | HTMLElement | null>(null);
  // Visible by default (no-JS / failed bundle). Hide only after JS arms the observer.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      setArmed(true);
      setShown(true);
      if (el.id === "tl") el.classList.add("on");
      return;
    }

    setArmed(true);
    setShown(false);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (entry.target.id === "tl") entry.target.classList.add("on");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mergedStyle =
    delay != null ? { ...style, transitionDelay: `${delay}s` } : style;
  const cls = [
    className,
    armed ? "rv" : "",
    armed && shown ? "in" : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (as === "article") {
    return (
      <article
        ref={ref as React.RefObject<HTMLElement>}
        id={id}
        className={cls}
        style={mergedStyle}
      >
        {children}
      </article>
    );
  }

  if (as === "section") {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id={id}
        className={cls}
        style={mergedStyle}
      >
        {children}
      </section>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      className={cls}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}
