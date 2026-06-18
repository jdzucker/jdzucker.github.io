# jdzucker.github.io

Personal academic portfolio website for **Jean-Daniel Zucker**, Research Director (DRCE) at IRD (Institut de Recherche pour le Développement) and Deputy Director of the UMI UMMISCO laboratory.

## Tech Stack

- **Hand-written static site** — plain HTML / CSS / vanilla JS, no build step
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

The site is fully static: the pages are authored by hand and published as-is.
There is no static-site generator.

## Project Structure

```text
.
├── index.html          # French homepage (default)
├── en/index.html       # English homepage
├── zh/index.html       # Chinese (Traditional) homepage
├── style.css           # Shared styles (FR/EN); ZH has its own inline theme
├── script.js           # Publications loader, i18n strings, dark mode, chart
├── favicon.svg
├── img/                # Photo, logos, book covers
├── static/             # citation_data.json (refreshed by CI)
├── recent_pubs.json    # Hand-curated recent publications
├── assets/scripts/     # Google Scholar citation fetcher
└── .github/workflows/  # CI/CD automation
```

## Local Development

No tooling required — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Automated Features

### Deployment

On every push to `main`, [gh-pages.yml](.github/workflows/gh-pages.yml) copies
the static files into `_site/` and publishes them to GitHub Pages. The build
copies: the three `index.html` pages, `style.css`, `script.js`, `favicon.svg`,
`static/citation_data.json`, `recent_pubs.json` and `img/`.

### Citation Data Updates

Google Scholar citation data is fetched every Sunday via
[fetch_citation_data.yml](.github/workflows/fetch_citation_data.yml). The script
[fetch_citation_data.py](assets/scripts/fetch_citation_data.py) scrapes the
statistics and writes them to [static/citation_data.json](static/citation_data.json),
which the pages load at runtime (alongside `recent_pubs.json`).

## License

Content © Jean-Daniel Zucker.
