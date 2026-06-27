from pydantic import BaseModel


class Recommendation(BaseModel):
    title: str
    score: float


class MovieResponse(BaseModel):
    movie: str
    recommendations: list[Recommendation]
