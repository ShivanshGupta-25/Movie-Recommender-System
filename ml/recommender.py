import pickle
import difflib
from pathlib import Path
from fastapi import HTTPException
from backend.logger import logger
from backend.cache import recommendation_cache
from backend.cache import search_cache
import logging

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"


class MovieRecommender:

    def __init__(self):

        self.movies = pickle.load(open(MODEL_DIR / "movies.pkl", "rb"))

        self.similarity = pickle.load(open(MODEL_DIR / "similarity.pkl", "rb"))

        self.titles = self.movies["title"].tolist()

    def recommend(self, movie_name, top_n=10):

        cache_key = movie_name.lower()

        if cache_key in recommendation_cache:

            logger.info(f"Cache hit for '{movie_name}'")

            return recommendation_cache[cache_key]

        try:

            match = difflib.get_close_matches(movie_name, self.titles, n=1, cutoff=0.5)

            if not match:
                logger.warning(f"Movie '{movie_name}' not found.")

                raise HTTPException(status_code=404, detail="Movie not found")

            close_match = match[0]

            movie_index = self.movies[self.movies["title"] == close_match].index[0]

            similarity_scores = list(enumerate(self.similarity[movie_index]))

            sorted_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

            recommendations = []

            for movie in sorted_movies[1 : top_n + 1]:

                idx = movie[0]

                title = self.movies.iloc[idx]["title"]

                score = round(float(movie[1]), 3)

                recommendations.append({"title": title, "score": score})

            logger.info(f"Generated {len(recommendations)} recommendations.")

            recommendation_cache[cache_key] = recommendations

            return recommendations

        except HTTPException:

            raise

        except Exception as e:

            logger.error(str(e))

            raise HTTPException(status_code=500, detail="Internal Server Error")

    def search(self, query):

        cache_key = query.lower()

        if cache_key in search_cache:

            logger.info(f"Cache hit for '{query}'")

            return search_cache[cache_key]

        matches = difflib.get_close_matches(query, self.titles, n=10, cutoff=0.4)

        search_cache[cache_key] = matches

        return matches

    def get_movie(self, title):

        movie = self.movies[self.movies["title"] == title]

        return movie.to_dict(orient="records")


if __name__ == "__main__":

    model = MovieRecommender()

    recs = model.recommend("Inception", top_n=10)

    # for movie in recs:
    #     print(movie)

    recs2 = model.search("iron man")

    for movie in recs2:
        print(movie)

    print(model.get_movie("Avatar"))
