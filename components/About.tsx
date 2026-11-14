import { SITE_CONFIG } from "@/lib/site-data";
import MediaPlaceholder from "./MediaPlaceholder";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="entreprise">
      <div className="wrap about">
        <Reveal className="pic">
          <div className="media" style={{ aspectRatio: "auto", height: "100%" }}>
            <MediaPlaceholder
              src={SITE_CONFIG.images.about || undefined}
              alt="Photo entreprise — à remplacer"
              label="Photo entreprise — à remplacer"
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="lbl">QUI SOMMES-NOUS ?</div>
          <h2>Une entreprise familiale. Une vision professionnelle.</h2>
          <p>
            ATH Construction est une entreprise familiale spécialisée dans la
            construction de maisons à Madagascar.
          </p>
          <p>
            Portée par une expertise en ingénierie du bâtiment et une passion
            pour la construction, notre entreprise met son savoir-faire au
            service de projets conçus pour durer.
          </p>
          <p>
            Chaque projet est abordé avec sérieux, méthode et une attention
            particulière portée à la qualité de réalisation.
          </p>
          <p>
            Notre ambition est simple : construire des habitations durables,
            fonctionnelles et pensées pour ceux qui les occupent.
          </p>
          <div className="vals">
            <div>
              <b>01</b>
              <span>Expertise technique</span>
            </div>
            <div>
              <b>02</b>
              <span>Engagement familial</span>
            </div>
            <div>
              <b>03</b>
              <span>Qualité durable</span>
            </div>
          </div>
          <a className="btn" href="#approche">
            Découvrir notre entreprise
          </a>
        </Reveal>
      </div>
    </section>
  );
}
