from cachetools import TTLCache

recommendation_cache = TTLCache(
    maxsize=500,
    ttl=3600
)

search_cache = TTLCache(
    maxsize=500, 
    ttl=3600
)