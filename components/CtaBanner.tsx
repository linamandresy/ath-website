import { SITE_CONFIG } from "@/lib/site-data";
import MediaPlaceholder from "./MediaPlaceholder";
import Reveal from "./Reveal";

export default function CtaBanner() {
  return (
    <section id="devis" className="cta-s" style={{ padding: "var(--s) 0" }}>
      <div className="bg">
        <MediaPlaceholder
          src={SITE_CONFIG.images.cta || undefined}
          alt="Photo de réalisation — à remplacer"
          label="Photo de réalisation — à remplacer"
        />
      </div>
      <Reveal className="wrap">
        <h2>Et si votre prochain projet commençait ici ?</h2>
        <p>
          Vous envisagez de construire votre maison à Madagascar ? Parlons de
          votre projet et étudions ensemble les possibilités.
        </p>
        <div className="cta">
          <a className="btn light" href="#contact">
            Discuter de mon projet
          </a>
          <a className="btn ghost" href="#contact">
            Nous contacter
          </a>
        </div>
      </Reveal>
    </section>
  );
}
