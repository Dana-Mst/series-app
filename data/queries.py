from data import data_manager
from psycopg2 import sql


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def most_rated_shows(offset, sorting_column, sorting_direction):
    if sorting_direction == 'asc':
        query = """
        SELECT shows.id, shows.title, shows.year, shows.runtime,
        shows.rating,
        array_agg(genres.name) as genres,
        shows.trailer, shows.homepage
        FROM shows
        LEFT JOIN show_genres
        ON shows.id = show_genres.show_id
        LEFT JOIN genres
        ON show_genres.genre_id = genres.id
        GROUP BY shows.id
        ORDER BY {col} ASC
        OFFSET %s
        LIMIT 15
        """
    else:
        query = """
        SELECT shows.id, shows.title, shows.year, shows.runtime,
        shows.rating,
        array_agg(genres.name) as genres,
        shows.trailer, shows.homepage
        FROM shows
        LEFT JOIN show_genres
        ON shows.id = show_genres.show_id
        LEFT JOIN genres
        ON show_genres.genre_id = genres.id
        GROUP BY shows.id
        ORDER BY {col} DESC
        OFFSET %s
        LIMIT 15
        """
    data = data_manager.execute_select(sql.SQL(query).format(
        col=sql.Identifier(sorting_column)), (offset, ))

    for index, item in enumerate(data):
        data[index]["rating"] = str(round(item["rating"], 1)) + " ☆"
        data[index]["year"] = item['year'].strftime('%Y')

    return data


def get_single_show(id):
    query = """
    SELECT shows.id, shows.title, shows.year, shows.runtime,
        shows.rating, shows.overview,
        array_agg(genres.name) as genres,
        shows.trailer, shows.homepage
        FROM shows
        LEFT JOIN show_genres
        ON shows.id = show_genres.show_id
        LEFT JOIN genres
        ON show_genres.genre_id = genres.id
        WHERE shows.id = %s
        GROUP BY shows.id
    """
    data = data_manager.execute_select(query, (id, ))

    for index, item in enumerate(data):
        data[index]["rating"] = str(round(item["rating"], 1)) + " ☆"
        data[index]["year"] = item['year'].strftime('%Y')

    return data


def get_seasons(id):
    query = """
    SELECT * FROM seasons
    WHERE show_id = %s
    """
    return data_manager.execute_select(query, (id, ))


def get_actors(id):
    query = """
    SELECT ARRAY_AGG(actors.name) AS name
    FROM show_characters
    JOIN actors
    ON show_characters.actor_id = actors.id
    WHERE show_id = %s
    GROUP BY show_id;
     """
    data = data_manager.execute_select(query, (id, ))
    return data[0]['name'][0:3]


def verify_user_if_exists(username):
    query = """
    SELECT password
    FROM users
    WHERE username = %s;
    """
    return data_manager.execute_select(query, (username, ))


def add_user(username, hashed_password):
    query = """
        INSERT INTO users (username, password)
        VALUES (%s, %s);
        """
    data_manager.execute_dml_statement(query, (username, hashed_password, ))
