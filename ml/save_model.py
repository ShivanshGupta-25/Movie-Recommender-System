import pickle

from train import train

movies, vectorizer, similarity = train()

pickle.dump(movies, open("../models/movies.pkl", "wb"))

pickle.dump(vectorizer, open("../models/tfidf.pkl", "wb"))

pickle.dump(similarity, open("../models/similarity.pkl", "wb"))

print("Models saved successfully")
