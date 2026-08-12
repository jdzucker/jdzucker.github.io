#!/usr/bin/env bash
#
# Met à jour les données de citations Google Scholar puis pousse sur GitHub.
#
#   1. exécute le script Python (récupère le profil Scholar en local)
#   2. déplace le résultat dans static/citation_data.json
#   3. committe et pousse -> déclenche le redéploiement du site
#
# Usage :  ./update_citations.sh
#
# Google Scholar bloque souvent les serveurs GitHub : lancer ce script en local
# est la méthode fiable. Voir PourMAJ.md / QuickStart.md.

set -euo pipefail

# Se placer à la racine du dépôt, quel que soit le répertoire d'appel.
cd "$(dirname "$0")"

PYTHON="${PYTHON:-.venv/bin/python}"

if [ ! -x "$PYTHON" ]; then
  echo "❌ Interpréteur introuvable : $PYTHON" >&2
  echo "   Créer l'environnement une fois :" >&2
  echo "     /usr/local/bin/python3.13 -m venv .venv && .venv/bin/pip install scholarly" >&2
  echo "   (le python3 par défaut n'a pas SSL et pip échoue)" >&2
  exit 1
fi

echo "→ Récupération des données Scholar…"
# Le script écrit citation_data.json dans le répertoire courant ; il sort en
# erreur si Scholar bloque, ce qui interrompt ici avant tout commit.
"$PYTHON" assets/scripts/fetch_citation_data.py

echo "→ Mise en place dans static/…"
mv citation_data.json static/citation_data.json

git add static/citation_data.json

if git diff --cached --quiet; then
  echo "✓ Données déjà à jour, rien à committer."
  exit 0
fi

echo "→ Commit et push…"
git commit -m "chore: update citation data"
git push

echo "✅ Terminé. Le site se redéploie automatiquement (~1 min)."
