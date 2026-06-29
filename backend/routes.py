from fastapi import APIRouter, HTTPException
from backend.schemas import MovieResponse
from ml.recommender import MovieRecommender
from urllib.parse import unquote
from backend.services.recommender_service import (
    get_recommendations,
    get_movie,
    top_movies,
    trending_movies,
    popular_movies,
    upcoming_movies,
    now_playing_movies,
    home_movies,
)
import time
from backend.utils import cache_stats

router = APIRouter()

# Load model only once when server starts
recommender = MovieRecommender()


@router.get("/")
def root():
    return {"message": "Movie Recommendation API", "version": "1.0.0"}


@router.get("/cache")
def cache_stats():
    return cache_stats()


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.get(
    "/recommend",
    summary="Get Movie Recommendations",
    description="Returns the most similar movies using TF-IDF cosine similarity.",
    tags=["Movie Recommendation"],
    response_model=MovieResponse,
)
def recommend(movie: str):
    return {"movie": movie, "recommendations": get_recommendations(movie)}


@router.get("/top")
def top():

    return top_movies()


@router.get("/trending")
def trending():

    return trending_movies()


@router.get("/home")
def home():
    return home_movies()


@router.get("/search")
def search(q: str):

    return recommender.search(q)


@router.get("/movie/{title}")
def movie_details(title: str):

    title = unquote(title)

    movie = get_movie(title)

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    return movie

@router.get("/popular")
def popular():

    return popular_movies()

@router.get("/upcoming")
def upcoming():

    return upcoming_movies()

@router.get("/now-playing")
def now_playing():

    return now_playing_movies()