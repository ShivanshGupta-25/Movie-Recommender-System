from concurrent.futures import ThreadPoolExecutor

from ml.recommender import MovieRecommender
from backend.services.tmdb_service import (
    fetch_movie,
    get_top_rated_movies,
    get_trending_movies,
)

recommender = MovieRecommender()


def enrich_movie(movie):

    title = movie["title"]

    details = fetch_movie(title)

    if details is None:

        return {
            "title": title,
            "score": movie["score"]
        }

    details["score"] = movie["score"]

    return details


def get_recommendations(movie_name: str, top_n: int = 10):

    recommendations = recommender.recommend(
        movie_name,
        top_n
    )

    if not recommendations:
        return []

    with ThreadPoolExecutor(max_workers=5) as executor:

        enriched = list(
            executor.map(
                enrich_movie,
                recommendations
            )
        )

    return enriched


def search_movies(query: str):

    return recommender.search(query)


def get_movie(title: str):

    return fetch_movie(title)

def top_movies():

    return get_top_rated_movies()


def trending_movies():

    return get_trending_movies()

def home_movies():
    return {
        "top": get_top_rated_movies(),
        "trending": get_trending_movies(),
    }