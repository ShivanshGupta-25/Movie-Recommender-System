import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from preprocess import load_data
from preprocess import preprocess


def train():

    movies = load_data()

    movies = preprocess(movies)

    vectorizer = TfidfVectorizer(
        stop_words="english", max_features=10000, ngram_range=(1, 2)
    )

    feature_vectors = vectorizer.fit_transform(movies["combined_features"])

    similarity = cosine_similarity(feature_vectors)

    return movies, vectorizer, similarity


if __name__ == "__main__":

    movies, vectorizer, similarity = train()

    print(similarity.shape)
