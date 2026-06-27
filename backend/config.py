import os

from pathlib import Path

from dotenv import load_dotenv


load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent


MODEL_DIR = BASE_DIR / "models"


MOVIES_MODEL = MODEL_DIR / "movies.pkl"

TFIDF_MODEL = MODEL_DIR / "tfidf.pkl"

SIMILARITY_MODEL = MODEL_DIR / "similarity.pkl"


HOST = os.getenv("HOST")

PORT = int(os.getenv("PORT"))

TOP_K = int(os.getenv("TOP_K"))

DEBUG = os.getenv("DEBUG") == "True"


TMDB_API_KEY = os.getenv("TMDB_API_KEY")