"use client";

import { useEffect, useRef } from "react";
import { STEPS } from "@/lib/site-data";
import Reveal from "./Reveal";

export default function Approach() {
  const tlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tlRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("on");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="approche">
      <div className="wrap">
        <Reveal>
          <div className="lbl">NOTRE APPROCHE</div>
          <h2>Un processus clair. Un résultat maîtrisé.</h2>
          <p style={{ color: "var(--mg)", marginTop: 18, maxWidth: 520 }}>
            Chaque projet suit une démarche structurée, de la première discussion
            à la livraison.
          </p>
        </Reveal>
        <div className="tl" id="tl" ref={tlRef}>
          <div className="line" />
          {STEPS.map(([title, text], i) => (
            <Reveal key={title} className="st" delay={i * 0.12}>
              <i>0{i + 1}</i>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
