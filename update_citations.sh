#!/usr/bin/env bash
#
# Met à jour les données de citations Google Scholar puis pousse sur GitHub.
#
#   1. exécute le script Python (récupère le profil Scholar en local)
#   2. contrôle la plausibilité du profil récupéré
#   3. l'installe dans static/citation_data.json
#   4. signale les chiffres périmés écrits en dur dans les pages
#   5. committe et pousse -> déclenche le redéploiement du site
#
# Usage :  ./update_citations.sh
#
# Google Scholar bloque souvent les serveurs GitHub : lancer ce script en local
# est la méthode fiable. Voir PourMAJ.md / QuickStart.md.

set -euo pipefail

# Se placer à la racine du dépôt, quel que soit le répertoire d'appel.
cd "$(dirname "$0")"

PYTHON="${PYTHON:-.venv/bin/python}"
CURRENT="static/citation_data.json"
FETCHED="citation_data.json"

if [ ! -x "$PYTHON" ]; then
  echo "❌ Interpréteur introuvable : $PYTHON" >&2
  echo "   Créer l'environnement une fois :" >&2
  echo "     /usr/local/bin/python3.13 -m venv .venv && .venv/bin/pip install -r assets/scripts/requirements.txt" >&2
  echo "   (le python3 par défaut n'a pas SSL et pip échoue)" >&2
  exit 1
fi

# Se synchroniser d'abord : le bot CI écrit le même fichier, et un retard sur
# origin ferait échouer le push après avoir déjà écrasé les données locales.
echo "→ Synchronisation avec origin…"
git pull --rebase

echo "→ Récupération des données Scholar…"
# Le script sort en 75 si Scholar bloque, en 1 sur toute autre erreur ;
# dans les deux cas set -e interrompt ici, avant le moindre commit.
"$PYTHON" assets/scripts/fetch_citation_data.py

echo "→ Contrôle de plausibilité…"
# Un profil tronqué (Scholar répond mais renvoie des données partielles) serait
# publié tel quel sans ce garde-fou. Seuils volontairement tolérants : citedby
# peut légitimement baisser de quelques unités quand Google réindexe.
"$PYTHON" - "$CURRENT" "$FETCHED" <<'PYEOF'
import json
import sys

old_path, new_path = sys.argv[1], sys.argv[2]

with open(new_path) as f:
    new = json.load(f)
try:
    with open(old_path) as f:
        old = json.load(f)
except (OSError, ValueError):
    old = {}

new_cit, old_cit = new.get("citedby") or 0, old.get("citedby") or 0
new_pub, old_pub = len(new.get("publications", [])), len(old.get("publications", []))

if not new_cit or not new_pub:
    sys.exit("❌ Profil vide (citedby=%s, publications=%s). Rien n'est installé." % (new_cit, new_pub))
if old_cit and new_cit < old_cit * 0.95:
    sys.exit("❌ Citations en chute : %s -> %s (plus de 5%%). Rien n'est installé." % (old_cit, new_cit))
if old_pub and new_pub < old_pub * 0.90:
    sys.exit("❌ Publications en chute : %s -> %s (plus de 10%%). Rien n'est installé." % (old_pub, new_pub))

print("   ✓ %s citations (%+d), %s publications (%+d), h-index %s"
      % (new_cit, new_cit - old_cit, new_pub, new_pub - old_pub, new.get("hindex")))
PYEOF

echo "→ Mise en place dans static/…"
mv "$FETCHED" "$CURRENT"

# La meta description et le JSON-LD portent les chiffres en dur : le JS ne les
# corrige pas (il n'agit que sur les [data-metric]), or c'est ce que Google
# indexe. On signale la dérive sans toucher au HTML.
"$PYTHON" - "$CURRENT" index.html en/index.html zh/index.html <<'PYEOF'
import io
import json
import re
import sys

with open(sys.argv[1]) as f:
    data = json.load(f)
hindex = data.get("hindex")

stale = []
for page in sys.argv[2:]:
    head = io.open(page, encoding="utf-8").read()[:4000]
    for found in re.findall(r"h-index (\d+)|h指數(\d+)", head):
        value = found[0] or found[1]
        if value and int(value) != hindex:
            stale.append("%s (h-index %s au lieu de %s)" % (page, value, hindex))
            break

if stale:
    print("⚠ Chiffres périmés dans les en-têtes, à corriger à la main :")
    for item in stale:
        print("   - %s" % item)
else:
    print("   ✓ Chiffres des en-têtes à jour.")
PYEOF

git add "$CURRENT"

if git diff --cached --quiet; then
  echo "✓ Données déjà à jour, rien à committer."
  exit 0
fi

echo "→ Commit et push…"
git commit -m "chore: update citation data"
git push

echo "✅ Terminé. Le site se redéploie automatiquement (~1 min)."
