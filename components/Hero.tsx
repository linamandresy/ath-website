import { SITE_CONFIG } from "@/lib/site-data";
import MediaPlaceholder from "./MediaPlaceholder";

export default function Hero() {
  return (
    <section className="hero" id="accueil" style={{ paddingBottom: 90 }}>
      <div className="bg">
        <MediaPlaceholder
          src={SITE_CONFIG.images.hero || undefined}
          alt="Photo d'accueil — à remplacer"
          label="Photo d'accueil — à remplacer"
          eager
        />
      </div>
      <svg
        className="wire"
        viewBox="0 0 400 300"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20 150 200 30l180 120z" stroke="#fff" strokeWidth=".8" />
        <path d="M60 150v100h280V150" stroke="#263DAD" strokeWidth="1.2" />
        <path d="M40 250h320v30H40z" stroke="#43C65A" strokeWidth="1.2" />
        <path
          d="M60 150 40 250M340 150l20 100M200 30v220"
          stroke="#fff"
          strokeWidth=".5"
          strokeDasharray="3 4"
        />
      </svg>
      <div className="wrap">
        <div className="in lbl">ATH CONSTRUCTION | MADAGASCAR</div>
        <h1 className="in">
          Donner forme à vos projets. Construire votre avenir.
        </h1>
        <p className="in">
          De la conception à la réalisation, ATH Construction met son expertise
          en ingénierie et son savoir-faire au service de vos projets de
          construction résidentielle.
        </p>
        <div className="in cta">
          <a className="btn light" href="#realisations">
            Découvrir nos réalisations
          </a>
          <a className="btn ghost" href="#contact">
            Demander un devis
          </a>
        </div>
      </div>
      <a className="scroll" href="#entreprise" aria-label="Défiler vers le bas">
        Défiler
      </a>
    </section>
  );
}
