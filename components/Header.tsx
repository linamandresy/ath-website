"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, asset } from "@/lib/site-data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("accueil");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const sections = document.querySelectorAll<HTMLElement>("main section[id]");
      let id = "accueil";
      sections.forEach((s) => {
        if (window.scrollY + 200 >= s.offsetTop) id = s.id;
      });
      setActive(id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header id="hd" className={scrolled ? "sc" : undefined}>
        <div className="wrap nav">
          <a
            className="brand"
            href="#accueil"
            aria-label="ATH Construction — Accueil"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("assets/logo.jpg")} alt="Logo ATH Construction" />
            <small>CONSTRUCTION &amp; INGÉNIERIE</small>
          </a>
          <nav aria-label="Navigation principale">
            <ul className="links">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={active === l.href.slice(1) ? "act" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn" href="#contact">
            Parlons de votre projet
          </a>
          <button
            className="burger"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mob"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <nav
        className={`mob${menuOpen ? " open" : ""}`}
        id="mob"
        aria-label="Menu mobile"
      >
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
        <a className="btn" href="#contact" onClick={closeMenu}>
          Parlons de votre projet
        </a>
      </nav>
    </>
  );
}
