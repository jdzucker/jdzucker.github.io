# jdzucker.github.io

Personal academic portfolio website for **Jean-Daniel Zucker**, Research Director (DRCE) at IRD (Institut de Recherche pour le Développement) and Deputy Director of the UMI UMMISCO laboratory.

## Tech Stack

- **Hand-written static site**: plain HTML / CSS / vanilla JS, no build step
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
├── static/             # citation_data.json (Scholar data, refreshed locally)
├── recent_pubs.json    # Hand-curated recent publications
├── assets/scripts/     # Google Scholar citation fetcher
└── .github/workflows/  # CI/CD automation
```

## Local Development

No tooling required, but the pages fetch `citation_data.json` **from the site
root**, where it only exists after deployment (the build copies it out of
`static/`). Without the symlink below, the Publications section and the chart
come up empty locally:

```bash
ln -sf static/citation_data.json citation_data.json   # once; gitignored
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Opening `index.html` straight from the filesystem does not work either: the
`fetch` calls are blocked by the browser's file:// origin policy.

## Automated Features

### Deployment

On every push to `main`, [gh-pages.yml](.github/workflows/gh-pages.yml) copies
the static files into `_site/` and publishes them to GitHub Pages. The build
copies: the three `index.html` pages, `style.css`, `script.js`, `favicon.svg`,
`sitemap.xml`, `robots.txt`, `static/citation_data.json`, `recent_pubs.json`
and `img/`.

That list is explicit, so **any new root-level file must be added to it**,
otherwise it is silently never deployed.

### Citation Data Updates

[fetch_citation_data.py](assets/scripts/fetch_citation_data.py) scrapes the
Scholar profile into [static/citation_data.json](static/citation_data.json),
which the pages load at runtime (alongside `recent_pubs.json`). Every figure on
the site (citations, h-index, publication count, chart) comes from that file.

**In practice, run it locally.** Google Scholar blocks GitHub runner IPs most of
the time, so the reliable route is one command on your own machine:

```bash
./update_citations.sh
```

It syncs with `origin`, fetches, sanity-checks the profile before installing it,
warns if the hard-coded figures in the page headers have drifted, then commits
and pushes. Detailed maintenance guides (`QuickStart.md`, `PourMAJ.md`) are
kept locally and are not part of this public repository.

The weekly workflow ([fetch_citation_data.yml](.github/workflows/fetch_citation_data.yml),
Sundays at 03:00 UTC) still runs and occasionally succeeds. When Scholar blocks
it, the script exits 75 and the run stays green with a notice; any other exit
code is a real failure and turns the run red.

## License

Content © Jean-Daniel Zucker.
