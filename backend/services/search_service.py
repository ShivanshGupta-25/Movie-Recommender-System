import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"


def search_movie_details(title: str):
    """
    Returns complete TMDB information for a movie title.
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

    movie = results[0]

    return {
        "id": movie["id"],
        "title": movie["title"],
        "poster_path": movie["poster_path"],
        "vote_average": movie["vote_average"],
        "release_date": movie["release_date"],
        "overview": movie["overview"],
        "genre_ids": movie["genre_ids"],
    }