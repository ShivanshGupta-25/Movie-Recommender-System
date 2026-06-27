from backend.cache import recommendation_cache
from backend.cache import search_cache


def cache_stats():

    return {
        "recommendation_cache": len(recommendation_cache),
        "search_cache": len(search_cache)
    }