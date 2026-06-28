import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"
IMAGE_BASE = os.getenv(
    "TMDB_IMAGE_BASE",
    "https://image.tmdb.org/t/p/w500"
)


def search_movie(title: str):

    if not API_KEY:
        raise ValueError("TMDB_API_KEY not found. Check your .env file.")

    url = f"{BASE_URL}/search/movie"

    params = {
        "api_key": API_KEY,
        "query": title,
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()

        data = response.json()

        results = data.get("results", [])

        if not results:
            return None

        movie = results[0]

        # Add complete poster URL
        if movie.get("poster_path"):
            movie["poster_url"] = IMAGE_BASE + movie["poster_path"]
        else:
            movie["poster_url"] = None

        return movie

    except requests.exceptions.RequestException as e:
        print(f"Request Error: {e}")
        return None
    
def get_movie_details(movie_id: int):

    if not API_KEY:
        raise ValueError("TMDB_API_KEY not found. Check your .env file.")

    url = f"{BASE_URL}/movie/{movie_id}"

    params = {
        "api_key": API_KEY
    }

    try:
        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        if response.status_code != 200:
            return None


        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Request Error: {e}")
        return None
    
def format_movie(details: dict):

    if details is None:
        return None

    return {

        "id": details.get("id"),

        "title": details.get("title"),

        "overview": details.get("overview"),

        "poster": (
            IMAGE_BASE + details["poster_path"]
            if details.get("poster_path")
            else None
        ),

        "backdrop": (
            IMAGE_BASE + details["backdrop_path"]
            if details.get("backdrop_path")
            else None
        ),

        "rating": details.get("vote_average"),

        "vote_count": details.get("vote_count"),

        "release_date": details.get("release_date"),

        "runtime": details.get("runtime"),

        "status": details.get("status"),

        "language": details.get("original_language"),

        "genres": [
            genre["name"]
            for genre in details.get("genres", [])
        ],

        "homepage": details.get("homepage")
    }

def fetch_movie(title: str):
    
    movie = search_movie(title)

    if movie is None:
        return None

    details = get_movie_details(movie["id"])

    if details is None:
        return None

    return format_movie(details)

# def fetch_movie(title: str):
#     print("Searching...")
#     movie = search_movie(title)

#     print(movie)

#     if movie is None:
#         print("Search failed")
#         return None

#     print("Fetching details...")
#     details = get_movie_details(movie["id"])

#     print(details)

#     if details is None:
#         print("Details failed")
#         return None

#     print("Formatting...")
#     return format_movie(details)