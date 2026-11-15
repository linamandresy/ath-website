"use client";

import { FormEvent, useRef, useState } from "react";
import {
  SITE_CONFIG,
  digitsWhatsApp,
  isWhatsAppConfigured,
} from "@/lib/site-data";
import Reveal from "./Reveal";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "74c7eead-d460-46eb-8049-2f1c98b6cc0e";
const SUBMIT_TIMEOUT_MS = 15_000;
const SUCCESS_MESSAGE =
  "Votre demande a bien été envoyée. Nous vous contacterons prochainement.";
const ERROR_MESSAGE =
  "Une erreur s'est produite lors de l'envoi. Veuillez réessayer dans quelques instants.";

/** Sanitized operator log — no visitor PII. Visible in browser DevTools / hosting logs. */
function logFormFailure(
  reason: string,
  detail: Record<string, string | number | boolean | undefined> = {},
) {
  console.error("[ATH contact form]", reason, detail);
}

function makeSubmissionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `ath-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

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
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  /** Reused across retries of the same payload so operators can spot duplicates. */
  const submissionRef = useRef<{ id: string; fingerprint: string } | null>(
    null,
  );

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setStatus(null);
    setStatusMessage(null);

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

    const form = e.currentTarget;
    const honeypot = form.elements.namedItem("botcheck");
    if (honeypot instanceof HTMLInputElement && honeypot.checked) {
      setStatus("success");
      setStatusMessage(SUCCESS_MESSAGE);
      setValues(INITIAL);
      setErrors({});
      return;
    }

    const fingerprint = [
      values.nom,
      values.email,
      values.tel,
      values.type,
      values.loc,
      values.bud,
      values.msg,
    ].join("\n");
    if (
      !submissionRef.current ||
      submissionRef.current.fingerprint !== fingerprint
    ) {
      submissionRef.current = {
        id: makeSubmissionId(),
        fingerprint,
      };
    }
    const submissionId = submissionRef.current.id;

    const data = new FormData(form);
    data.set("access_key", WEB3FORMS_ACCESS_KEY);
    data.set("subject", "Nouvelle demande — ATH Constructions");
    data.set("from_name", "ATH Constructions");
    // Web3Forms Reply-To / recognized sender email (not the French label name)
    data.set("email", values.email.trim());
    data.set("name", values.nom.trim());
    data.set("submission_id", submissionId);
    // Web3Forms honeypot: must stay empty for humans
    data.set("botcheck", "");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      SUBMIT_TIMEOUT_MS,
    );

    setSubmitting(true);
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body: data,
        signal: controller.signal,
      });
      const raw = await res.text();
      let json: { success?: boolean; message?: string } | null = null;
      try {
        json = JSON.parse(raw) as { success?: boolean; message?: string };
      } catch {
        json = null;
      }

      // HTTP OK + unreadable body: treat as delivered to avoid duplicate retries
      const delivered =
        json?.success === true || (res.ok && json === null);

      if (!delivered) {
        const providerMessage =
          typeof json?.message === "string"
            ? json.message.slice(0, 160)
            : undefined;
        logFormFailure("submission_rejected", {
          status: res.status,
          submission_id: submissionId,
          provider_message: providerMessage,
          body_parsable: json !== null,
        });
        setStatus("error");
        setStatusMessage(ERROR_MESSAGE);
        return;
      }

      submissionRef.current = null;
      setStatus("success");
      setStatusMessage(SUCCESS_MESSAGE);
      setValues(INITIAL);
      setErrors({});
    } catch (err) {
      const aborted =
        err instanceof DOMException && err.name === "AbortError";
      logFormFailure(aborted ? "submission_timeout" : "submission_network", {
        submission_id: submissionId,
        timeout_ms: aborted ? SUBMIT_TIMEOUT_MS : undefined,
      });
      setStatus("error");
      setStatusMessage(ERROR_MESSAGE);
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
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
          <form
            onSubmit={onSubmit}
            noValidate
            aria-busy={submitting}
          >
            <input
              type="hidden"
              name="access_key"
              value={WEB3FORMS_ACCESS_KEY}
            />
            {/* Web3Forms honeypot — hidden from users; bots that fill it are rejected */}
            <input
              type="checkbox"
              name="botcheck"
              className="hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className={`f full${errors.nom ? " bad" : ""}`}>
              <label htmlFor="nom">Nom complet *</label>
              <input
                id="nom"
                name="name"
                autoComplete="name"
                required
                value={values.nom}
                onChange={set("nom")}
                onBlur={() => onBlur("nom")}
                aria-invalid={!!errors.nom}
                disabled={submitting}
              />
              <div className="err">{errors.nom}</div>
            </div>
            <div className={`f${errors.email ? " bad" : ""}`}>
              <label htmlFor="email">Adresse e-mail *</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={set("email")}
                onBlur={() => onBlur("email")}
                aria-invalid={!!errors.email}
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
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
                disabled={submitting}
              />
              <div className="err">{errors.msg}</div>
            </div>
            <div className="f full">
              <button
                className="btn"
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>
            </div>
            {statusMessage && (
              <div
                id="ok"
                className={status === "error" ? "fail" : undefined}
                role={status === "error" ? "alert" : "status"}
                style={{ display: "block" }}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
