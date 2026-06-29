import os
from pathlib import Path

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"
IMAGE_BASE = os.getenv(
    "TMDB_IMAGE_BASE",
    "https://image.tmdb.org/t/p/w500"
)

# -----------------------------
# Reusable HTTP Session
# -----------------------------
session = requests.Session()

# ------------------------------------------
# HTTP Session
# ------------------------------------------

session = requests.Session()

retry = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[
        429,
        500,
        502,
        503,
        504,
    ],
)

adapter = HTTPAdapter(max_retries=retry)

session.mount("http://", adapter)

session.mount("https://", adapter)

session.headers.update(
    {
        "Accept": "application/json",
        "User-Agent": "MovieAI/1.0",
    }
)

def request(endpoint: str, params=None):
    """
    Generic TMDB GET request.
    """

    if not API_KEY:
        raise ValueError(
            "TMDB_API_KEY not found."
        )

    url = f"{BASE_URL}/{endpoint}"

    payload = {
        "api_key": API_KEY,
    }

    if params:
        payload.update(params)

    try:

        response = session.get(
            url,
            params=payload,
            timeout=15,
        )

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as e:

        print(f"TMDB ERROR: {e}")

        return None

def search_movie(title: str):
    """
    Search a movie by title.
    """

    data = request(
        "search/movie",
        {
            "query": title,
            "include_adult": False,
        },
    )

    if not data:
        return None

    results = data.get("results", [])

    if not results:
        return None

    # Prefer exact title match
    for movie in results:

        if movie["title"].lower() == title.lower():
            return movie

    return results[0]
    
def get_movie_details(movie_id: int):
    """
    Fetch complete details of a movie by TMDB ID.
    """

    return request(f"movie/{movie_id}")
    
def format_movie(details: dict):
    """
    Format TMDB response into frontend-friendly JSON.
    """

    if not details:
        return None

    return {

        "id": details.get("id"),

        "title": details.get("title"),

        "overview": details.get("overview"),

        "tagline": details.get("tagline"),

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

        "homepage": details.get("homepage"),

        "budget": details.get("budget"),

        "revenue": details.get("revenue"),

        "popularity": details.get("popularity"),

        "genres": [
            genre["name"]
            for genre in details.get("genres", [])
        ],

        "production_companies": [
            company["name"]
            for company in details.get(
                "production_companies",
                []
            )
        ],

        "production_countries": [
            country["name"]
            for country in details.get(
                "production_countries",
                []
            )
        ],

        "spoken_languages": [
            language["english_name"]
            if "english_name" in language
            else language["name"]
            for language in details.get(
                "spoken_languages",
                []
            )
        ],
    }

def fetch_movie(title: str):
    """
    Complete pipeline:

    title
        ↓
    search
        ↓
    movie id
        ↓
    details
        ↓
    formatted json
    """

    movie = search_movie(title)

    if movie is None:
        return None

    details = get_movie_details(movie["id"])

    if details is None:
        return None

    return format_movie(details)

def fetch_movies(titles):
    """
    Fetch multiple movie details.
    """

    movies = []

    for title in titles:

        movie = fetch_movie(title)

        if movie:
            movies.append(movie)

    return movies


def format_movie_list(results):
    """
    Convert TMDB movie list into frontend format.
    """

    movies = []

    for movie in results:

        movies.append({

            "id": movie.get("id"),

            "title": movie.get("title"),

            "overview": movie.get("overview"),

            "poster": (
                IMAGE_BASE + movie["poster_path"]
                if movie.get("poster_path")
                else None
            ),

            "backdrop": (
                IMAGE_BASE + movie["backdrop_path"]
                if movie.get("backdrop_path")
                else None
            ),

            "rating": movie.get("vote_average"),

            "vote_count": movie.get("vote_count"),

            "release_date": movie.get("release_date"),

            "popularity": movie.get("popularity"),

            "genres": [],

        })

    return movies


def get_top_rated_movies(limit: int = 20):
    """
    Fetch Top Rated movies.
    """

    data = request(
        "movie/top_rated",
        {
            "page": 1,
        },
    )

    if not data:
        return []

    return format_movie_list(
        data.get("results", [])[:limit]
    )    
    
def get_trending_movies(limit: int = 20):
    """
    Fetch Trending movies.
    """

    data = request(
        "trending/movie/week"
    )

    if not data:
        return []

    return format_movie_list(
        data.get("results", [])[:limit]
    )

def get_popular_movies(limit: int = 20):
    """
    Fetch Popular movies.
    """

    data = request(
        "movie/popular"
    )

    if not data:
        return []

    return format_movie_list(
        data.get("results", [])[:limit]
    )

def get_upcoming_movies(limit: int = 20):

    data = request(
        "movie/upcoming"
    )

    if not data:
        return []

    return format_movie_list(
        data.get("results", [])[:limit]
    )

def get_now_playing_movies(limit: int = 20):

    data = request(
        "movie/now_playing"
    )

    if not data:
        return []

    return format_movie_list(
        data.get("results", [])[:limit]
    )