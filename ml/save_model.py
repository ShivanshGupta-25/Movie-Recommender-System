import pickle
from pathlib import Path

from train import train

# Train the model
movies, vectorizer, similarity = train()

# Project root
BASE_DIR = Path(__file__).resolve().parent.parent

# Models directory
MODEL_DIR = BASE_DIR / "models"

# Create models directory if it doesn't exist
MODEL_DIR.mkdir(parents=True, exist_ok=True)

# Save models
with open(MODEL_DIR / "movies.pkl", "wb") as f:
    pickle.dump(movies, f)

with open(MODEL_DIR / "tfidf.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

with open(MODEL_DIR / "similarity.pkl", "wb") as f:
    pickle.dump(similarity, f)

print("✅ Models saved successfully!")