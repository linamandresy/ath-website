import {
  NAV_LINKS,
  SERVICES,
  SITE_CONFIG,
  asset,
  digitsWhatsApp,
  isWhatsAppConfigured,
} from "@/lib/site-data";

export default function Footer() {
  const C = SITE_CONFIG.contact;
  const wa = digitsWhatsApp(C.whatsapp);

  const contactNodes: React.ReactNode[] = [];
  if (C.phone) contactNodes.push(<a href={`tel:${C.phone}`}>{C.phone}</a>);
  if (C.email) contactNodes.push(<a href={`mailto:${C.email}`}>{C.email}</a>);
  if (C.address) contactNodes.push(<span>{C.address}</span>);
  if (C.facebook) {
    contactNodes.push(
      <a href={C.facebook} target="_blank" rel="noopener noreferrer">
        Page Facebook
      </a>,
    );
  }
  if (isWhatsAppConfigured(C.whatsapp)) {
    contactNodes.push(
      <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
        +{wa}
      </a>,
    );
  }

  const footerNav = NAV_LINKS.filter(
    (l) =>
      l.href === "#accueil" ||
      l.href === "#entreprise" ||
      l.href === "#realisations" ||
      l.href === "#approche",
  );

  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Logo ATH Constructions" src={asset("assets/logo.jpg")} />
            <p>
              ATH Constructions, votre partenaire pour des projets de
              construction résidentielle à Madagascar.
            </p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              {footerNav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {SERVICES.map(([title]) => (
                <li key={title}>
                  <a href="#services">{title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              {contactNodes.length ? (
                contactNodes.map((n, i) => <li key={i}>{n}</li>)
              ) : (
                <li>Coordonnées à renseigner</li>
              )}
            </ul>
          </div>
        </div>
        <div className="cr">© 2026 ATH Constructions. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
