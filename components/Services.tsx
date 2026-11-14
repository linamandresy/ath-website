import { SERVICES, SITE_CONFIG } from "@/lib/site-data";
import MediaPlaceholder from "./MediaPlaceholder";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <Reveal className="head">
          <div>
            <div className="lbl">SERVICES</div>
            <h2>Notre savoir-faire à votre service.</h2>
          </div>
          <p>Des solutions adaptées à chaque étape de votre projet immobilier.</p>
        </Reveal>
        <div className="sgrid">
          {SERVICES.map(([title, text], i) => (
            <Reveal key={title} as="article" className="srv">
              <div className="media">
                <MediaPlaceholder
                  src={SITE_CONFIG.images.services[i] || undefined}
                  alt={title}
                  label="Image de démonstration"
                />
              </div>
              <div className="row">
                <span className="n">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <span className="arr" aria-hidden="true">
                  →
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
