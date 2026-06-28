# from ml.recommender import MovieRecommender
# from fastapi import APIRouter, HTTPException
# from backend.schemas import MovieResponse
# import time
# from backend.utils import cache_stats


# recommender = MovieRecommender()


# def get_recommendations(movie_name: str, limit: int = 10):

#     start_time = time.time()
#     recommendations = recommender.recommend(movie_name)
#     end = time.time()

#     processing_time = round((end - start_time) * 1000)
#     if not recommendations:
#         raise HTTPException(
#             status_code=404,
#             detail="Movie not found"
#         )

#     return {

#         "success": True,

#         "movie": movie_name,

#         "processing_time_ms": processing_time,

#         "total": len(recommendations),

#         "recommendations": recommendations

#     }

from concurrent.futures import ThreadPoolExecutor

from ml.recommender import MovieRecommender
from backend.services.tmdb_service import fetch_movie

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