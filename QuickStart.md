# QuickStart — Mettre à jour le site en 2 minutes

Le site est **100 % statique** : on modifie un fichier, on l'enregistre, on pousse sur GitHub, et le site se met à jour tout seul (~1 min plus tard) sur **https://jdzucker.github.io**.

> Pas besoin d'installer quoi que ce soit. Tout se fait depuis l'éditeur + 3 commandes git (ou directement sur le site github.com).

---

## Les 3 choses qu'on fait le plus souvent

### 1. Rafraîchir les citations (chiffres Google Scholar)

Rien à coder. Aller sur la page du robot et cliquer sur **Run workflow** :

👉 https://github.com/jdzucker/jdzucker.github.io/actions/workflows/fetch_citation_data.yml

Il met à jour les citations, l'h-index et le graphique, puis redéploie tout seul.
*(Il tourne aussi automatiquement chaque dimanche.)*

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
