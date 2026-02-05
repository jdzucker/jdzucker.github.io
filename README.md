# jdzucker.github.io

Personal academic portfolio website for **Jean-Daniel Zucker**, Research Director at IRD (Institut de Recherche pour le Développement) and head of the UMI UMMISCO laboratory.

## Tech Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/) (v0.141.0+)
- **Theme**: [Blowfish](https://github.com/nunocoracao/blowfish)
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## Project Structure

```
.
├── config/_default/     # Hugo configuration (languages, menus, params)
├── content/             # Markdown content (homepage, timeline)
├── data/fr/             # JSON data files (citation data)
├── assets/              # CSS, images, icons
├── static/              # Static files served as-is
└── .github/workflows/   # CI/CD automation
```

## Local Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.141.0 or later)
- Git

### Setup

```bash
# Clone with submodules (required for theme)
git clone --recurse-submodules https://github.com/jdzucker/jdzucker.github.io.git
cd jdzucker.github.io

# Start development server
hugo server -D
```

The site will be available at `http://localhost:1313/`

### Build

```bash
hugo --gc --minify
```

Output is generated in the `public/` directory.

## Automated Features

### Deployment

The site automatically deploys to GitHub Pages on every push to the `main` branch via [gh-pages.yml](.github/workflows/gh-pages.yml).

### Citation Data Updates

Google Scholar citation data is automatically fetched every Sunday using [fetch_citation_data.yml](.github/workflows/fetch_citation_data.yml). The script [fetch_citation_data.py](assets/scripts/fetch_citation_data.py) scrapes citation statistics and updates [citation_data.json](data/fr/citation_data.json).

## Configuration

Main configuration files in `config/_default/`:

| File | Purpose |
|------|---------|
| `hugo.toml` | Core Hugo settings (base URL, theme, outputs) |
| `params.toml` | Theme parameters (layout, colors, features) |
| `languages.fr.toml` | French language settings (default) |
| `languages.en.toml` | English language settings |
| `menus.fr.toml` | Navigation menu structure |

## License

Content © Jean-Daniel Zucker. Theme under its respective license.
