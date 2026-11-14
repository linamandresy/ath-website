# ATH Construction — Site vitrine

Site statique (HTML / CSS / JS) pour **ATH Construction**, entreprise familiale de construction et d’ingénierie à Madagascar.

## Structure

```
index.html          # Page d’accueil (markup sémantique)
css/styles.css      # Styles
js/main.js          # Interactions (menu, projets, formulaire)
assets/logo.jpg     # Logo
robots.txt          # Directives robots
sitemap.xml         # Plan du site
.nojekyll           # Désactive le traitement Jekyll sur GitHub Pages
```

## URL attendue

Après activation de GitHub Pages :  
**https://linamandresy.github.io/ath-website/**

Les chemins sont relatifs : le site fonctionne aussi bien en racine de dépôt qu’en site projet (`/ath-website/`).

## Déploiement GitHub Pages

1. Le workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publie le contenu du dépôt à chaque push sur `master` (Actions → GitHub Pages).
2. Dans **Settings → Pages**, choisir la source **GitHub Actions** (une seule fois).
3. `.nojekyll` évite que Jekyll n’ignore ou ne transforme des assets.

Alternative manuelle : Settings → Pages → Deploy from branch → `master` / `/ (root)`.

## Développement local

```bash
python3 -m http.server 8080
# ouvrir http://127.0.0.1:8080/
```

## Configuration du contenu

Coordonnées et images de projets : éditer `SITE_CONFIG` et `projects` dans [`js/main.js`](js/main.js).
