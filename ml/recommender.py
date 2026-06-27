import pickle
import difflib


class MovieRecommender:

    def __init__(self):

        self.movies = pickle.load(open("../models/movies.pkl", "rb"))

        self.similarity = pickle.load(open("../models/similarity.pkl", "rb"))

        self.titles = self.movies["title"].tolist()

    def recommend(self, movie_name, top_n=10):

        match = difflib.get_close_matches(movie_name, self.titles, n=1, cutoff=0.5)

        if not match:
            return []

        close_match = match[0]

        movie_index = self.movies[self.movies["title"] == close_match].index[0]

        similarity_scores = list(enumerate(self.similarity[movie_index]))

        sorted_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        recommendations = []

        for movie in sorted_movies[1 : top_n + 1]:

            idx = movie[0]

            title = self.movies.iloc[idx]["title"]

            recommendations.append(
                {"title": title, "score": round(float(similarity_scores[idx][1]), 3)}
            )

        return recommendations

    def search(self, query):

        matches = difflib.get_close_matches(query, self.titles, n=10, cutoff=0.4)

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
