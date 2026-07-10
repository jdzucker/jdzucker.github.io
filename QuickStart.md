# QuickStart — Mettre à jour le site en 2 minutes

Le site est **100 % statique** : on modifie un fichier, on l'enregistre, on pousse sur GitHub, et le site se met à jour tout seul (~1 min plus tard) sur **https://jdzucker.github.io**.

> Tout se fait depuis l'éditeur + 3 commandes git (ou directement sur le site github.com). Seul le rafraîchissement des citations demande un petit script Python en local (voir point 1).

---

## Les 3 choses qu'on fait le plus souvent

### 1. Rafraîchir les citations (chiffres Google Scholar)

Les chiffres du site (citations, h-index, nombre d'articles, graphique) viennent tous de `static/citation_data.json` : on met à jour ce fichier et tout suit, rien à changer dans le HTML.

**Méthode fiable (depuis votre Mac)** — Google bloque souvent les serveurs GitHub, donc le plus sûr est de lancer le script en local :

```bash
cd /Users/jdz/PROGRAMMATION/PYTHON-JUPITER/CV/jdzucker.github.io
.venv/bin/python assets/scripts/fetch_citation_data.py
mv citation_data.json static/citation_data.json
git add static/citation_data.json && git commit -m "chore: update citation data" && git push
```

*(Première fois seulement : `/usr/local/bin/python3.13 -m venv .venv && .venv/bin/pip install scholarly`. Bien utiliser `python3.13`, le `python3` par défaut n'a pas SSL.)*

**Méthode bouton (à tenter d'abord si vous préférez)** — cliquer sur **Run workflow** ici :

👉 https://github.com/jdzucker/jdzucker.github.io/actions/workflows/fetch_citation_data.yml

S'il passe au vert ✅, tout est fait (il tourne aussi chaque dimanche). S'il vire au rouge ❌ avec « Cannot Fetch from Google Scholar », c'est Google qui bloque : utiliser la méthode locale ci-dessus.

### 2. Ajouter une nouvelle publication

Ouvrir **`recent_pubs.json`** (à la racine) et ajouter un bloc en haut de la liste :

```json
{
  "bib": {
    "title": "Titre de l'article",
    "pub_year": "2026",
    "citation": "Nom de la revue, volume, pages, année"
  },
  "num_citations": 0,
  "url": "https://doi.org/...",
  "authors": "Auteur A, Auteur B, Zucker JD, ..."
}
```

⚠️ Ne pas oublier la **virgule** entre deux blocs.

### 3. Corriger un texte (bio, poste, distinction…)

Le contenu visible est dans les pages HTML :

| Langue | Fichier |
|:--|:--|
| 🇫🇷 Français | `index.html` |
| 🇬🇧 Anglais | `en/index.html` |
| 🇨🇳 Chinois | `zh/index.html` |

Chercher le texte à changer, le modifier, enregistrer.
**Penser à faire la modif dans les 3 langues** si elle concerne tout le monde.

> 💡 Inutile de retoucher les chiffres Scholar (citations, h-index, nombre d'articles) : ils s'affichent automatiquement depuis `citation_data.json`. Seuls les chiffres **Scopus** sont encore écrits en dur dans les 3 pages.

---

## Publier les changements

Après avoir modifié un fichier, dans un terminal à la racine du projet :

```bash
git add .
git commit -m "mise à jour"
git push
```

Une minute après, le site est à jour. C'est tout. ✅

---

## Vérifier que le déploiement a marché

👉 https://github.com/jdzucker/jdzucker.github.io/actions

Un ✅ vert = c'est en ligne. Un ❌ rouge = cliquer dessus pour voir l'erreur.

---

*Besoin de plus de détails (méthode manuelle, structure complète) ? Voir `PourMAJ.md`.*
