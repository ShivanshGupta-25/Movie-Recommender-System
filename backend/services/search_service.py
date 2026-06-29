import os
import requests
from dotenv import load_dotenv
from rapidfuzz import fuzz

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"


def search_movie_details(title: str):
    """
    Search TMDB and return the movie that best matches the title.
    """

    url = f"{BASE_URL}/search/movie"

    response = requests.get(
        url,
        params={
            "api_key": API_KEY,
            "query": title,
        },
        timeout=10,
    )

    response.raise_for_status()

    results = response.json().get("results", [])

    if not results:
        return None

    # Pick the closest title instead of blindly taking the first one
    movie = max(
        results,
        key=lambda m: fuzz.ratio(
            title.lower(),
            m["title"].lower()
        )
    )

    return {
        "id": movie["id"],
        "title": movie["title"],
        "poster_path": movie["poster_path"],
        "vote_average": movie["vote_average"],
        "release_date": movie["release_date"],
        "overview": movie["overview"],
        "genre_ids": movie["genre_ids"],
    }