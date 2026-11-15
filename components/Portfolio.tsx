"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATS, projects, type Project } from "@/lib/site-data";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import MediaPlaceholder from "./MediaPlaceholder";
import Reveal from "./Reveal";

function projectImages(p: Project): string[] {
  const filled = (p.images || []).filter((s) => !!s?.trim());
  if (filled.length) return filled;
  if (p.cover?.trim()) return [p.cover];
  return [""];
}

function coverSrc(p: Project): string | undefined {
  return p.cover?.trim() || p.images?.find((s) => !!s?.trim()) || undefined;
}

export default function Portfolio() {
  const [category, setCategory] = useState<string>(CATS[0]);
  const [open, setOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const list = useMemo(
    () =>
      category === CATS[0]
        ? projects
        : projects.filter((p) => p.category === category),
    [category],
  );

  const safeIndex = list.length
    ? ((projectIndex % list.length) + list.length) % list.length
    : 0;
  const current = list[safeIndex];
  const imgs = current ? projectImages(current) : [""];

  const closeModal = useCallback(() => {
    setOpen(false);
    unlockScroll();
    lastFocus.current?.focus();
  }, []);

  const openProject = (i: number, from?: HTMLElement | null) => {
    if (!list.length) return;
    setProjectIndex((i + list.length) % list.length);
    setImageIndex(0);
    if (from) lastFocus.current = from;
    setOpen(true);
    lockScroll();
    requestAnimationFrame(() => closeBtn.current?.focus());
  };

  const selectCategory = (c: string) => {
    setCategory(c);
    setProjectIndex(0);
    setImageIndex(0);
    if (open) closeModal();
  };

  const shiftImage = useCallback(
    (d: number) => {
      const n = imgs.length;
      setImageIndex((ii) => (ii + d + n) % n);
    },
    [imgs.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") shiftImage(-1);
      if (e.key === "ArrowRight") shiftImage(1);
      if (e.key === "Tab" && modalRef.current) {
        const focusable = [
          ...modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ].filter((el) => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal, shiftImage]);

  useEffect(() => {
    return () => {
      if (open) unlockScroll();
    };
  }, [open]);

  const metaRows = current
    ? (
        [
          ["Localisation", current.location],
          ["Catégorie", current.category],
          ["Année", current.year],
        ] as [string, string][]
      ).filter((r) => r[1])
    : [];

  return (
    <>
      <section className="pf" id="realisations">
        <div className="wrap">
          <Reveal>
            <div className="lbl">PORTFOLIO</div>
            <h2>Nos réalisations</h2>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.4rem",
                marginTop: 14,
              }}
            >
              Des projets concrets, des espaces de vie conçus pour durer.
            </p>
            <p className="intro">
              Découvrez quelques-uns des projets réalisés par ATH Constructions
              et explorez notre savoir-faire à travers des constructions pensées
              pour répondre aux besoins de chaque client.
            </p>
          </Reveal>
          <div className="filters" role="group" aria-label="Filtrer les projets">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => selectCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="gal" aria-live="polite">
            {list.length ? (
              list.map((p, i) => (
                <button
                  key={p.id}
                  className="card"
                  type="button"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  aria-label={`Ouvrir le projet ${p.title}`}
                  onClick={(e) => openProject(i, e.currentTarget)}
                >
                  <div className="media">
                    <MediaPlaceholder
                      src={coverSrc(p)}
                      alt={p.title}
                      label="Démonstration — photo à remplacer"
                    />
                  </div>
                  <div className="meta">
                    <div>
                      <h3>{p.title}</h3>
                      <small>
                        {[p.location, p.year].filter(Boolean).join(" — ") ||
                          "Localisation à renseigner"}
                      </small>
                    </div>
                    <span className="cat">{p.category}</span>
                  </div>
                </button>
              ))
            ) : (
              <p className="empty">
                Aucun projet dans cette catégorie pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>

      <div
        ref={modalRef}
        className={`modal${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mt"
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {open && current && (
          <>
            <button
              className="close"
              type="button"
              ref={closeBtn}
              aria-label="Fermer"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="mb">
              <div className="stage">
                <div className="view">
                  <MediaPlaceholder
                    src={imgs[imageIndex] || undefined}
                    alt={`${current.title} — photo ${imageIndex + 1}`}
                    label="Démonstration — photo à remplacer"
                    eager
                  />
                </div>
                {imgs.length > 1 && (
                  <>
                    <button
                      className="nv p"
                      type="button"
                      aria-label="Photo précédente"
                      onClick={() => shiftImage(-1)}
                    >
                      ←
                    </button>
                    <button
                      className="nv n"
                      type="button"
                      aria-label="Photo suivante"
                      onClick={() => shiftImage(1)}
                    >
                      →
                    </button>
                  </>
                )}
                <div className="cnt">
                  {imageIndex + 1} / {imgs.length}
                </div>
              </div>
              <div className="info">
                <div className="lbl" style={{ color: "var(--green)" }}>
                  {current.category}
                </div>
                <h3 id="mt">{current.title}</h3>
                <dl>
                  {metaRows.length ? (
                    metaRows.map(([k, v]) => (
                      <div key={k} style={{ display: "contents" }}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))
                  ) : (
                    <>
                      <dt>Détails</dt>
                      <dd>À renseigner</dd>
                    </>
                  )}
                </dl>
                <p>
                  {current.description ||
                    "Description du projet à renseigner."}
                </p>
                <div className="thumbs">
                  {imgs.map((_, k) => (
                    <button
                      key={k}
                      type="button"
                      aria-current={k === imageIndex ? "true" : undefined}
                      aria-label={`Photo ${k + 1}`}
                      onClick={() => setImageIndex(k)}
                    >
                      {k + 1}
                    </button>
                  ))}
                </div>
                <div className="pn">
                  <button
                    type="button"
                    onClick={() => {
                      setProjectIndex(
                        (safeIndex - 1 + list.length) % list.length,
                      );
                      setImageIndex(0);
                    }}
                  >
                    ← Projet précédent
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProjectIndex((safeIndex + 1) % list.length);
                      setImageIndex(0);
                    }}
                  >
                    Projet suivant →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
