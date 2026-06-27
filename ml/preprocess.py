import pandas as pd


FEATURES = [
    'genres',
    'keywords',
    'tagline',
    'cast',
    'director'
]


def load_data(path="../data/movies.csv"):
    df = pd.read_csv(path)
    return df


def preprocess(df):

    for feature in FEATURES:
        df[feature] = df[feature].fillna('')

    df['combined_features'] = (
            df['genres']
            + ' ' +
            df['keywords']
            + ' ' +
            df['tagline']
            + ' ' +
            df['cast']
            + ' ' +
            df['director']
    )

    return df


if __name__ == "__main__":

    movies = load_data()

    movies = preprocess(movies)

    print(movies.head())