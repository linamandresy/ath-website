"use client";

import { FormEvent, useState } from "react";
import {
  SITE_CONFIG,
  digitsWhatsApp,
  isWhatsAppConfigured,
} from "@/lib/site-data";
import Reveal from "./Reveal";

type FieldKey =
  | "nom"
  | "email"
  | "tel"
  | "type"
  | "loc"
  | "bud"
  | "msg";

const INITIAL = {
  nom: "",
  email: "",
  tel: "",
  type: "",
  loc: "",
  bud: "",
  msg: "",
};

export default function Contact() {
  const C = SITE_CONFIG.contact;
  const wa = digitsWhatsApp(C.whatsapp);
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<string | null>(null);

  const contactRows: [string, React.ReactNode][] = [
    [
      "Téléphone",
      C.phone ? <a href={`tel:${C.phone}`}>{C.phone}</a> : null,
    ],
    [
      "E-mail",
      C.email ? <a href={`mailto:${C.email}`}>{C.email}</a> : null,
    ],
    ["Adresse", C.address || null],
    [
      "Facebook",
      C.facebook ? (
        <a href={C.facebook} target="_blank" rel="noopener noreferrer">
          Page Facebook
        </a>
      ) : null,
    ],
    [
      "WhatsApp",
      isWhatsAppConfigured(C.whatsapp) ? (
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
          +{wa}
        </a>
      ) : null,
    ],
  ];

  function validateField(key: FieldKey, value: string): string {
    const required: FieldKey[] = ["nom", "email", "tel", "type", "loc", "msg"];
    if (required.includes(key) && !value.trim()) {
      return "Ce champ est obligatoire.";
    }
    if (
      key === "email" &&
      value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
    ) {
      return "Saisissez une adresse e-mail valide (ex. nom@exemple.com).";
    }
    if (
      key === "tel" &&
      value.trim() &&
      !/^[+\d][\d\s().-]{6,}$/.test(value.trim())
    ) {
      return "Saisissez un numéro de téléphone valide.";
    }
    return "";
  }

  function onBlur(key: FieldKey) {
    const msg = validateField(key, values[key]);
    setErrors((e) => ({ ...e, [key]: msg || undefined }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus(null);
    const keys: FieldKey[] = ["nom", "email", "tel", "type", "loc", "bud", "msg"];
    const next: Partial<Record<FieldKey, string>> = {};
    let ok = true;
    keys.forEach((k) => {
      const msg = validateField(k, values[k]);
      if (msg) {
        next[k] = msg;
        ok = false;
      }
    });
    setErrors(next);
    if (!ok) return;

    const lines = ["*Nouvelle demande — ATH Construction*", ""];
    const named: [string, string][] = [
      ["Nom", values.nom],
      ["E-mail", values.email],
      ["Téléphone", values.tel],
      ["Type de projet", values.type],
      ["Localisation", values.loc],
      ["Budget estimatif", values.bud],
      ["Message", values.msg],
    ];
    named.forEach(([n, v]) => {
      if (v.trim()) lines.push(`*${n} :* ${v.trim()}`);
    });

    if (!isWhatsAppConfigured(C.whatsapp)) {
      setStatus(
        "Le numéro WhatsApp n'est pas encore configuré (SITE_CONFIG.contact.whatsapp dans lib/site-data.ts).",
      );
      return;
    }

    const text = lines.join("\n");
    const encoded = encodeURIComponent(text);
    // Keep WhatsApp deep-link under typical browser URL limits.
    if (encoded.length > 1500) {
      setStatus(
        "Votre message est trop long pour WhatsApp. Raccourcissez-le puis réessayez.",
      );
      return;
    }

    const popup = window.open(
      `https://wa.me/${wa}?text=${encoded}`,
      "_blank",
      "noopener",
    );
    if (!popup) {
      setStatus(
        "Impossible d'ouvrir WhatsApp (fenêtre bloquée). Autorisez les pop-ups pour ce site, puis renvoyez le formulaire — vos saisies sont conservées.",
      );
      return;
    }

    setStatus(
      "Merci ! WhatsApp s'ouvre avec votre demande : appuyez sur « Envoyer » pour la transmettre à notre équipe.",
    );
    setValues(INITIAL);
    setErrors({});
  }

  const set =
    (key: FieldKey) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <section id="contact">
      <div className="wrap ct">
        <Reveal>
          <div className="lbl">CONTACT</div>
          <h2>Parlons de votre projet.</h2>
          <p>
            Vous avez un projet de construction, une question ou souhaitez
            obtenir un devis ? Notre équipe est à votre écoute.
          </p>
          <ul className="coords">
            {contactRows.map(([label, node]) => (
              <li key={label}>
                <b>{label}</b>
                {node || <span>À renseigner</span>}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <form onSubmit={onSubmit} noValidate>
            <div className={`f full${errors.nom ? " bad" : ""}`}>
              <label htmlFor="nom">Nom complet *</label>
              <input
                id="nom"
                name="Nom"
                autoComplete="name"
                required
                value={values.nom}
                onChange={set("nom")}
                onBlur={() => onBlur("nom")}
                aria-invalid={!!errors.nom}
              />
              <div className="err">{errors.nom}</div>
            </div>
            <div className={`f${errors.email ? " bad" : ""}`}>
              <label htmlFor="email">Adresse e-mail *</label>
              <input
                id="email"
                name="E-mail"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={set("email")}
                onBlur={() => onBlur("email")}
                aria-invalid={!!errors.email}
              />
              <div className="err">{errors.email}</div>
            </div>
            <div className={`f${errors.tel ? " bad" : ""}`}>
              <label htmlFor="tel">Numéro de téléphone *</label>
              <input
                id="tel"
                name="Téléphone"
                type="tel"
                autoComplete="tel"
                required
                value={values.tel}
                onChange={set("tel")}
                onBlur={() => onBlur("tel")}
                aria-invalid={!!errors.tel}
              />
              <div className="err">{errors.tel}</div>
            </div>
            <div className={`f${errors.type ? " bad" : ""}`}>
              <label htmlFor="type">Type de projet *</label>
              <select
                id="type"
                name="Type de projet"
                required
                value={values.type}
                onChange={set("type")}
                onBlur={() => onBlur("type")}
                aria-invalid={!!errors.type}
              >
                <option value="">Sélectionner…</option>
                <option>Construction de maison</option>
                <option>Construction de villa</option>
                <option>Rénovation</option>
                <option>Extension</option>
                <option>Autre projet</option>
              </select>
              <div className="err">{errors.type}</div>
            </div>
            <div className={`f${errors.loc ? " bad" : ""}`}>
              <label htmlFor="loc">Localisation du projet *</label>
              <input
                id="loc"
                name="Localisation"
                required
                value={values.loc}
                onChange={set("loc")}
                onBlur={() => onBlur("loc")}
                aria-invalid={!!errors.loc}
              />
              <div className="err">{errors.loc}</div>
            </div>
            <div className="f full">
              <label htmlFor="bud">Budget estimatif (facultatif)</label>
              <input
                id="bud"
                name="Budget estimatif"
                value={values.bud}
                onChange={set("bud")}
              />
            </div>
            <div className={`f full${errors.msg ? " bad" : ""}`}>
              <label htmlFor="msg">Votre message *</label>
              <textarea
                id="msg"
                name="Message"
                rows={4}
                required
                value={values.msg}
                onChange={set("msg")}
                onBlur={() => onBlur("msg")}
                aria-invalid={!!errors.msg}
              />
              <div className="err">{errors.msg}</div>
            </div>
            <div className="f full">
              <button className="btn" type="submit">
                Envoyer ma demande
              </button>
            </div>
            {status && (
              <div id="ok" role="status" style={{ display: "block" }}>
                {status}
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
