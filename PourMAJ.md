# Guide de mise à jour du site

## Mise à jour des données de citations (Google Scholar)

### Méthode automatique (recommandée)

1. Aller sur la page des workflows GitHub Actions :  
   **https://github.com/jdzucker/jdzucker.github.io/actions/workflows/fetch_citation_data.yml**

2. Cliquer sur le bouton **"Run workflow"** (en haut à droite de la liste des runs)

3. Laisser la branche sur `main` et cliquer **"Run workflow"**

Le workflow va :
- Interroger Google Scholar via la bibliothèque `scholarly`
- Mettre à jour le fichier `static/citation_data.json`
- Committer et pousser automatiquement
- Déclencher un redéploiement du site

> Le workflow tourne aussi **automatiquement chaque dimanche à 03h00 UTC**.

---

### Méthode manuelle (si le workflow échoue)

Éditer directement le fichier `static/citation_data.json` :

- Mettre à jour `citedby` (total des citations)
- Mettre à jour `hindex` et `i10index`
- Mettre à jour `cites_per_year` pour l'année en cours
- Puis committer et pousser :

```bash
git add static/citation_data.json
git commit -m "chore: update citation data"
git push origin main
```

---

## Ajouter de nouvelles publications

Les publications récentes non encore indexées par Google Scholar se trouvent dans :

**`recent_pubs.json`** (à la racine du projet)

Format d'une entrée :

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

Après modification, committer et pousser :

```bash
git add recent_pubs.json
git commit -m "feat: add new publications"
git push origin main
```

---

## Déployer le site

Tout `push` sur la branche `main` déclenche automatiquement le déploiement via GitHub Actions.  
Le site est accessible sur : **https://jdzucker.github.io**

Vérifier le statut du déploiement :  
**https://github.com/jdzucker/jdzucker.github.io/actions**

---

## Structure des fichiers clés

| Fichier | Rôle |
|:--------|:-----|
| `index.html` | Page principale (français) |
| `en/index.html` | Page en anglais |
| `zh/index.html` | Page en chinois traditionnel |
| `style.css` | Feuille de styles partagée |
| `script.js` | JavaScript (publications, mode sombre, graphique) |
| `static/citation_data.json` | Données Google Scholar (citations par année) |
| `recent_pubs.json` | Publications récentes avec liens DOI/arXiv |
| `img/` | Images (photo, couvertures de livres, logos) |
| `.github/workflows/gh-pages.yml` | Workflow de déploiement |
| `.github/workflows/fetch_citation_data.yml` | Workflow de mise à jour Scholar |
