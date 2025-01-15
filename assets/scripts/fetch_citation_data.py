import requests
from bs4 import BeautifulSoup
import json
import datetime
from scholarly import scholarly

import matplotlib.pyplot as plt
from datetime import datetime


# URL of the page to scrape
URL = "https://scholar.google.com/citations?user=bcrbZrEAAAAJ&hl"

# File to save the extracted data
OUTPUT_FILE = "citation_data.json"

def fetch_citation_data():
    try:
        user_id = "bcrbZrEAAAAJ"  # Replace with the user ID from the URL

        # Fetch the user profile
        search_query = scholarly.search_author_id(user_id)
        profile = scholarly.fill(search_query)


        # Extract citation data
        print("Processing citations...")
        citations_per_year = profile.get("cites_per_year", {})
        years = sorted(citations_per_year.keys())
        citations = [citations_per_year[year] for year in years]

        with open(OUTPUT_FILE, "w") as f:
            json.dump(profile, f, indent=4)


        # Plot citations per year
        plt.figure(figsize=(10, 6))
        plt.bar(years, citations, color="skyblue", edgecolor="black")
        plt.title(f"Citations Per Year for {profile['name']}")
        plt.xlabel("Year")
        plt.ylabel("Citations")
        plt.xticks(rotation=45)
        plt.grid(axis="y", linestyle="--", alpha=0.7)
        plt.tight_layout()
        plt.show()
        plt.savefig("Visu.png")
        # Calculate new citations this month
        print("Calculating new citations this month...")
        current_year = datetime.now().year

        # Scholarly does not provide monthly breakdowns, but you can estimate new citations
        # based on recent years (e.g., a running total for this year).
        citations_this_year = citations_per_year.get(current_year, 0)
        estimated_last_year = citations_per_year.get(current_year - 1, 0)
        new_citations_this_month = citations_this_year - estimated_last_year

        # Display new citation count
        print(f"New citations this month: {new_citations_this_month}")

        data = json.dumps({
            "citations_per_year":citations_per_year, 

        })
        # Save to file
        with open(OUTPUT_FILE, "w") as f:
            json.dump(data, f, indent=4)

        print(f"Data fetched and saved successfully: {data}")

    except Exception as e:
        print(f"Error occurred: {e}")

if __name__ == "__main__":
    fetch_citation_data()
