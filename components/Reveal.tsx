"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      if (el.id === "tl") el.classList.add("on");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
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
  const cls = `rv ${className}`.trim();

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
    <div ref={ref as React.RefObject<HTMLDivElement>} id={id} className={cls} style={mergedStyle}>
      {children}
    </div>
  );
}
