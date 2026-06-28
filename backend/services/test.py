import tmdb_service as tmdb

# movie = tmdb.search_movie("Iron Man")
# details = tmdb.get_movie_details(movie["id"])
# # print(details)
# print(tmdb.format_movie(details))

# if movie:
#     print("Title       :", movie["title"])
#     print("Release Date:", movie["release_date"])
#     print("Rating      :", movie["vote_average"])
#     print("Overview    :", movie["overview"])
#     print("Poster URL  :", movie["poster_url"])
# else:
#     print("Movie not found.")

movie = tmdb.fetch_movie("Iron Man")
print(movie)