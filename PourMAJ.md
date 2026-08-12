# Guide de mise à jour du site

## Mise à jour des données de citations (Google Scholar)

Les chiffres visibles sur le site (citations, h-index, nombre d'articles, graphique) sont **injectés automatiquement** depuis `static/citation_data.json` : il suffit de mettre ce fichier à jour, aucun HTML à toucher. Seuls les chiffres **Scopus** restent en dur dans les pages.

### Méthode recommandée : exécution locale

Google Scholar bloque presque toujours les adresses IP des serveurs GitHub. La méthode fiable est de lancer le script depuis votre machine.

```bash
cd /Users/jdz/PROGRAMMATION/PYTHON-JUPITER/CV/jdzucker.github.io

# Une seule fois (création de l'environnement) :
/usr/local/bin/python3.13 -m venv .venv
.venv/bin/pip install scholarly

# À chaque mise à jour, une seule commande :
./update_citations.sh
```

Le script `update_citations.sh` enchaîne : récupération Scholar → `static/citation_data.json` → commit → push (le push redéploie le site). Il s'interrompt sans rien pousser si Scholar bloque, et ne committe pas si les chiffres sont inchangés.

Détail des étapes si besoin de les lancer à la main :

```bash
.venv/bin/python assets/scripts/fetch_citation_data.py
mv citation_data.json static/citation_data.json
git add static/citation_data.json
git commit -m "chore: update citation data"
git push
```

> ⚠️ Utiliser `/usr/local/bin/python3.13`, pas `python3` : le Python par défaut de la machine (pyenv 3.7.4) n'a pas le module SSL et `pip` échoue.

### Méthode workflow GitHub (tenter, sans garantie)

1. Aller sur **https://github.com/jdzucker/jdzucker.github.io/actions/workflows/fetch_citation_data.yml**
2. Cliquer **"Run workflow"**, laisser la branche sur `main`, confirmer

S'il passe, il met à jour `static/citation_data.json`, committe, pousse et redéploie le site. Il tourne aussi automatiquement chaque dimanche à 03h00 UTC. Mais il échoue le plus souvent en rouge avec `Error: Cannot Fetch from Google Scholar` : c'est le blocage d'IP, pas un bug — utiliser alors la méthode locale ci-dessus.

### Méthode manuelle (dernier recours)

Éditer directement `static/citation_data.json` :

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
| `script.js` | JavaScript (publications, métriques dynamiques, mode sombre, graphique) |
| `static/citation_data.json` | Données Google Scholar (profil complet : publications, citations par année, h-index) |
| `recent_pubs.json` | Publications récentes avec liens DOI/arXiv |
| `img/` | Images (photo, couvertures de livres, logos) |
| `update_citations.sh` | Raccourci : récupère Scholar, committe et pousse |
| `assets/scripts/fetch_citation_data.py` | Script de récupération Scholar (CI et local) |
| `.github/workflows/gh-pages.yml` | Workflow de déploiement |
| `.github/workflows/fetch_citation_data.yml` | Workflow de mise à jour Scholar (souvent bloqué par Google) |
| `CODE_REVIEW.md` | Revue de code du site (10 juillet 2026) |
