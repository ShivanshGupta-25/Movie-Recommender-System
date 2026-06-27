from fastapi import APIRouter, HTTPException
from backend.schemas import MovieResponse
from ml.recommender import MovieRecommender
import time

router = APIRouter()

# Load model only once when server starts
recommender = MovieRecommender()

@router.get("/")
def root():
    return {
        "message": "Movie Recommendation API",
        "version": "1.0.0"
    }

@router.get("/health")
def health():
    return {
        "status": "healthy"
    }

@router.get(
        "/recommend",
        summary="Get Movie Recommendations",    description="Returns the most similar movies using TF-IDF cosine similarity.",
        tags=["Movie Recommendation"],
        response_model=MovieResponse)
def recommend(movie: str):

    start_time = time.time()
    recommendations = recommender.recommend(movie)
    end = time.time()

    processing_time = round((end - start_time) * 1000)
    if not recommendations:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return {

        "success": True,

        "movie": movie,

        "processing_time_ms": processing_time,

        "total": len(recommendations),

        "recommendations": recommendations

    }

@router.get("/search")
def search(q: str):

    return recommender.search(q)

@router.get("/movie/{title}")
def movie_details(title: str):

    movie = recommender.get_movie(title)

    if not movie:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return movie