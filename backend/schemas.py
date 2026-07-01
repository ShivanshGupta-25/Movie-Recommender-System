from typing import Optional

from pydantic import BaseModel


class Recommendation(BaseModel):
    id: Optional[int] = None

    title: str

    overview: Optional[str] = None

    tagline: Optional[str] = None

    poster: Optional[str] = None

    backdrop: Optional[str] = None

    rating: Optional[float] = None

    vote_count: Optional[int] = None

    release_date: Optional[str] = None

    runtime: Optional[int] = None

    status: Optional[str] = None

    language: Optional[str] = None

    homepage: Optional[str] = None

    budget: Optional[int] = None

    revenue: Optional[int] = None

    popularity: Optional[float] = None

    genres: list[str] = []

    production_companies: list[str] = []

    production_countries: list[str] = []

    spoken_languages: list[str] = []

    score: float


class MovieResponse(BaseModel):
    movie: str

    recommendations: list[Recommendation]