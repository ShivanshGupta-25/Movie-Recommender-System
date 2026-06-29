from backend.services.tmdb_service import fetch_movie

movie = fetch_movie("The Shawshank Redemption")

print(movie)