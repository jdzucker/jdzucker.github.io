"""Récupère le profil Google Scholar et l'écrit dans citation_data.json.

Codes de sortie (exploités par .github/workflows/fetch_citation_data.yml) :
    0  succès
   75  Google Scholar a refusé la requête (blocage d'IP). Cause attendue et
       fréquente sur les runners GitHub : le workflow la tolère sans passer
       au rouge. 75 = EX_TEMPFAIL, « échec temporaire, réessayer plus tard ».
    1  toute autre erreur (bug, dépendance cassée, profil introuvable).
       Le workflow doit échouer franchement : c'est ce qui manquait quand
       bibtexparser 2.x a cassé scholarly pendant une semaine sans alerte.
"""

import datetime
import json
import sys

from scholarly import scholarly

OUTPUT_FILE = "citation_data.json"
USER_ID = "bcrbZrEAAAAJ"

EXIT_BLOCKED = 75
EXIT_ERROR = 1

# Messages typiques du blocage Scholar, tels que remontés par scholarly.
BLOCKED_MARKERS = (
    "cannot fetch from google scholar",
    "cannot fetch the page",
    "robot",
    "captcha",
    "429",
    "too many requests",
)


def is_blocked(exc):
    """Vrai si l'exception traduit un refus de Scholar plutôt qu'un bug."""
    name = type(exc).__name__.lower()
    if "maxtries" in name or "scholarly" in name:
        return True
    text = str(exc).lower()
    return any(marker in text for marker in BLOCKED_MARKERS)


def fetch_citation_data():
    author = scholarly.search_author_id(USER_ID)
    profile = scholarly.fill(author)

    # Horodatage de récupération : sans lui, rien n'indique la fraîcheur des
    # chiffres, ni dans le fichier ni sur le site.
    profile["fetched_at"] = datetime.datetime.now(datetime.timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%SZ"
    )

    with open(OUTPUT_FILE, "w") as f:
        json.dump(profile, f, indent=4)

    print(
        "OK: {} publications, {} citations, h-index {}".format(
            len(profile.get("publications", [])),
            profile.get("citedby"),
            profile.get("hindex"),
        )
    )


if __name__ == "__main__":
    try:
        fetch_citation_data()
    except Exception as e:
        if is_blocked(e):
            print("Bloqué par Google Scholar : {}".format(e), file=sys.stderr)
            sys.exit(EXIT_BLOCKED)
        print("Erreur : {}: {}".format(type(e).__name__, e), file=sys.stderr)
        sys.exit(EXIT_ERROR)
