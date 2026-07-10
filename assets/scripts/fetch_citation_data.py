import json
import sys
from scholarly import scholarly

OUTPUT_FILE = "citation_data.json"
USER_ID = "bcrbZrEAAAAJ"


def fetch_citation_data():
    author = scholarly.search_author_id(USER_ID)
    profile = scholarly.fill(author)
    with open(OUTPUT_FILE, "w") as f:
        json.dump(profile, f, indent=4)
    print(f"OK: {len(profile.get('publications', []))} publications, "
          f"{profile.get('citedby')} citations")


if __name__ == "__main__":
    try:
        fetch_citation_data()
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
