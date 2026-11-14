import { WHYS } from "@/lib/site-data";
import Reveal from "./Reveal";

export default function Why() {
  return (
    <section id="pourquoi" className="why dark">
      <div className="wrap">
        <Reveal className="top">
          <div>
            <div className="lbl">POURQUOI NOUS CHOISIR</div>
            <h2>
              Votre projet mérite une expertise à la hauteur de vos ambitions.
            </h2>
          </div>
          <p>
            Construire une maison est une décision importante. Nous mettons notre
            expertise et notre engagement au service de chaque projet.
          </p>
        </Reveal>
        <Reveal className="adv">
          {WHYS.map((w) => (
            <div key={w.n}>
              <b>{w.n}</b>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
