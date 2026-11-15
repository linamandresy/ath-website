# ATH Constructions — Site vitrine (Next.js)

Site vitrine **ATH Constructions** (construction & ingénierie à Madagascar), édité comme un projet **Next.js** (App Router + TypeScript) et **déployé en export statique** sur GitHub Pages.

## URL attendue

**https://linamandresy.github.io/ath-website/**

`basePath` / `assetPrefix` : `/ath-website` (site projet GitHub Pages).

## Développement local

```bash
npm ci
npm run dev
# ouvrir http://localhost:3000/ath-website/
```

Le `basePath` s’applique aussi en local : utilisez le préfixe `/ath-website/`.

## Build (export statique)

```bash
npm run build
```

Génère le dossier **`out/`** (HTML/CSS/JS statiques). C’est ce dossier que GitHub Pages publie — pas le code source Next.

## Structure

```
app/                 # App Router (layout, page, CSS global)
components/          # Header, Hero, sections, Footer, etc.
lib/site-data.ts     # Contenu éditable (contact, images, projets)
public/assets/       # Logo et assets statiques
public/robots.txt
public/sitemap.xml
public/.nojekyll
.github/workflows/pages.yml
```

## Configuration du contenu

Coordonnées, images et projets : éditer [`lib/site-data.ts`](lib/site-data.ts) (`SITE_CONFIG`, `projects`, `SERVICES`, etc.).

## Déploiement GitHub Pages

Le workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) :

1. Sur push à `master` (ou `workflow_dispatch`)
2. `npm ci` → `npm run build`
3. Publie **`out/`** via `actions/upload-pages-artifact` + `actions/deploy-pages`

`.nojekyll` est inclus dans l’export (`public/.nojekyll`) pour que Pages ne traite pas le site avec Jekyll.

**Activation (une fois)** : Settings → Pages → Source **GitHub Actions**.  
Le workflow tente aussi `enablement: true` ; si le token ne peut pas créer le site Pages, activez manuellement puis relancez le workflow.
