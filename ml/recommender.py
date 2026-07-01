# import pickle
# import difflib
# from rapidfuzz import process, fuzz
# from pathlib import Path
# from fastapi import HTTPException
# from backend.logger import logger
# from backend.cache import recommendation_cache
# from backend.cache import search_cache
# import logging
# from backend.services.search_service import search_movie_details

# BASE_DIR = Path(__file__).resolve().parent.parent
# MODEL_DIR = BASE_DIR / "models"


# class MovieRecommender:

#     def __init__(self):

#         self.movies = pickle.load(open(MODEL_DIR / "movies.pkl", "rb"))

#         self.similarity = pickle.load(open(MODEL_DIR / "similarity.pkl", "rb"))

#         self.titles = self.movies["title"].tolist()

#     def recommend(self, movie_name, top_n=10):

#         cache_key = movie_name.lower()

#         if cache_key in recommendation_cache:

#             logger.info(f"Cache hit for '{movie_name}'")

#             return recommendation_cache[cache_key]

#         try:

#             match = difflib.get_close_matches(movie_name, self.titles, n=1, cutoff=0.5)

#             if not match:
#                 logger.warning(f"Movie '{movie_name}' not found.")

#                 raise HTTPException(status_code=404, detail="Movie not found")

#             close_match = match[0]

#             movie_index = self.movies[self.movies["title"] == close_match].index[0]

#             similarity_scores = list(enumerate(self.similarity[movie_index]))

#             sorted_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

#             recommendations = []

#             for movie in sorted_movies[1 : top_n + 1]:

#                 idx = movie[0]

#                 title = self.movies.iloc[idx]["title"]

#                 score = round(float(movie[1]), 3)

#                 recommendations.append({"title": title, "score": score})

#             logger.info(f"Generated {len(recommendations)} recommendations.")

#             recommendation_cache[cache_key] = recommendations

#             return recommendations

#         except HTTPException:

#             raise

#         except Exception as e:

#             logger.error(str(e))

#             raise HTTPException(status_code=500, detail="Internal Server Error")

#     def search(self, query):

#         cache_key = query.lower().strip()

#         if cache_key in search_cache:
#             logger.info(f"Cache hit for '{query}'")
#             return search_cache[cache_key]

#         if not cache_key:
#             return []

#         # ----------------------------
#         # Priority 1 : Starts With
#         # ----------------------------

#         startswith_matches = [
#             title
#             for title in self.titles
#             if title.lower().startswith(cache_key)
#         ]

#         # ----------------------------
#         # Priority 2 : Contains
#         # ----------------------------

#         contains_matches = [
#             title
#             for title in self.titles
#             if cache_key in title.lower()
#             and title not in startswith_matches
#         ]

#         # ----------------------------
#         # Priority 3 : Fuzzy Search
#         # ----------------------------

#         fuzzy_results = process.extract(
#             query,
#             self.titles,
#             scorer=fuzz.WRatio,
#             limit=20,
#         )

#         fuzzy_matches = [
#             title
#             for title, score, _ in fuzzy_results
#             if score >= 65
#         ]

#         # ----------------------------
#         # Merge all matches
#         # ----------------------------

#         final_titles = []

#         for group in [
#             startswith_matches,
#             contains_matches,
#             fuzzy_matches,
#         ]:

#             for title in group:

#                 if title not in final_titles:

#                     final_titles.append(title)

#         # ----------------------------
#         # TMDB Enrichment
#         # ----------------------------

#         enriched_movies = []

#         for title in final_titles[:10]:

#             try:

#                 movie = search_movie_details(title)

#                 if movie:

#                     enriched_movies.append(movie)

#             except Exception as e:

#                 logger.warning(f"TMDB lookup failed for '{title}': {e}")

#         search_cache[cache_key] = enriched_movies

#         return enriched_movies

#     def get_movie(self, title):

#         movie = self.movies[self.movies["title"] == title]

#         return movie.to_dict(orient="records")


# if __name__ == "__main__":

#     model = MovieRecommender()

#     recs = model.recommend("Inception", top_n=10)

#     # for movie in recs:
#     #     print(movie)

#     recs2 = model.search("iron man")

#     for movie in recs2:
#         print(movie)

#     print(model.get_movie("Avatar"))



import os
import pickle
import difflib
from pathlib import Path

import gdown
from fastapi import HTTPException
from rapidfuzz import process, fuzz
from dotenv import load_dotenv

from backend.logger import logger
from backend.cache import recommendation_cache, search_cache
from backend.services.search_service import search_movie_details

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)

MOVIES_MODEL_ID = os.getenv("MOVIES_MODEL_ID")
SIMILARITY_MODEL_ID = os.getenv("SIMILARITY_MODEL_ID")


def download_model(file_id: str, filename: str):
    """
    Downloads model from Google Drive if it does not exist.
    """

    path = MODEL_DIR / filename

    if path.exists():
        logger.info(f"{filename} already exists.")
        return path

    if not file_id:
        raise RuntimeError(f"{filename} Google Drive ID is missing.")

    logger.info(f"Downloading {filename}...")

    url = f"https://drive.google.com/uc?id={file_id}"

    gdown.download(
        url=url,
        output=str(path),
        quiet=False,
    )

    logger.info(f"{filename} downloaded successfully.")

    return path


class MovieRecommender:

    def __init__(self):

        movies_path = download_model(
            MOVIES_MODEL_ID,
            "movies.pkl",
        )

        similarity_path = download_model(
            SIMILARITY_MODEL_ID,
            "similarity.pkl",
        )

        with open(movies_path, "rb") as f:
            self.movies = pickle.load(f)

        with open(similarity_path, "rb") as f:
            self.similarity = pickle.load(f)

        self.titles = self.movies["title"].tolist()

    def recommend(self, movie_name, top_n=10):

        cache_key = movie_name.lower()

        if cache_key in recommendation_cache:
            logger.info(f"Cache hit for '{movie_name}'")
            return recommendation_cache[cache_key]

        try:

            match = difflib.get_close_matches(
                movie_name,
                self.titles,
                n=1,
                cutoff=0.5,
            )

            if not match:
                logger.warning(f"Movie '{movie_name}' not found.")
                raise HTTPException(
                    status_code=404,
                    detail="Movie not found",
                )

            close_match = match[0]

            movie_index = self.movies[
                self.movies["title"] == close_match
            ].index[0]

            similarity_scores = list(
                enumerate(self.similarity[movie_index])
            )

            sorted_movies = sorted(
                similarity_scores,
                key=lambda x: x[1],
                reverse=True,
            )

            recommendations = []

            for movie in sorted_movies[1 : top_n + 1]:

                idx = movie[0]

                recommendations.append(
                    {
                        "title": self.movies.iloc[idx]["title"],
                        "score": round(float(movie[1]), 3),
                    }
                )

            recommendation_cache[cache_key] = recommendations

            return recommendations

        except HTTPException:
            raise

        except Exception as e:

            logger.exception(e)

            raise HTTPException(
                status_code=500,
                detail="Internal Server Error",
            )

    def search(self, query):

        cache_key = query.lower().strip()

        if cache_key in search_cache:
            return search_cache[cache_key]

        if not cache_key:
            return []

        startswith_matches = [
            title
            for title in self.titles
            if title.lower().startswith(cache_key)
        ]

        contains_matches = [
            title
            for title in self.titles
            if cache_key in title.lower()
            and title not in startswith_matches
        ]

        fuzzy_results = process.extract(
            query,
            self.titles,
            scorer=fuzz.WRatio,
            limit=20,
        )

        fuzzy_matches = [
            title
            for title, score, _ in fuzzy_results
            if score >= 65
        ]

        final_titles = []

        for group in (
            startswith_matches,
            contains_matches,
            fuzzy_matches,
        ):
            for title in group:
                if title not in final_titles:
                    final_titles.append(title)

        enriched_movies = []

        for title in final_titles[:10]:
            try:

                movie = search_movie_details(title)

                if movie:
                    enriched_movies.append(movie)

            except Exception as e:
                logger.warning(
                    f"TMDB lookup failed for '{title}': {e}"
                )

        search_cache[cache_key] = enriched_movies

        return enriched_movies

    def get_movie(self, title):

        movie = self.movies[
            self.movies["title"] == title
        ]

        return movie.to_dict(orient="records")