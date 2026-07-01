from fastapi import FastAPI
from backend.routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Movie Recommendation API",
    version="1.0.0",
    description="""
Production Ready Movie Recommendation System

Built using

• FastAPI

• Scikit-Learn

• TF-IDF

• Cosine Similarity

• Pickle Models

""",
    contact={"name": "Shivansh Gupta", "email": "your_email@gmail.com"},
    license_info={"name": "MIT"},
)

origins = [
    "http://localhost:5173",                  # Local React app
    "https://shivanshgupta25-movie-rs.vercel.app",  # Replace after deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")
