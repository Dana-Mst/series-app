from flask import Flask, render_template, url_for, request, redirect
from data import queries
import math
from dotenv import load_dotenv
from util import json_response
from password_manager import hash_password, verify_password

load_dotenv()
app = Flask('codecool_series')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get-shows')
@json_response
def get_shows():
    shows = queries.get_shows()
    return shows


@app.route('/most-rated-shows')
def most_rated_shows():
    return render_template('most-rated.html')


@app.route('/get-15-most-rated/<int:page_number>/<column>/<direction>')
@json_response
def get_15_most_rated(page_number, column, direction):
    offset = (page_number*15) - 15
    get_15_most_rated = queries.most_rated_shows(offset, column, direction)
    return get_15_most_rated


@app.route('/show/<int:id>')
def display_show(id):
    return render_template('show.html')


@app.route('/single-show/<int:id>')
@json_response
def get_single_show(id):
    seasons = queries.get_seasons(id)
    actors = queries.get_actors(id)
    show = queries.get_single_show(id)
    data = {}
    data["seasons"] = seasons
    data['actors'] = actors
    data['show'] = show
    return data


@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get('password')
        confirmed_password = request.form.get("confirm-password")
        check_if_user_allready_exists = queries.verify_user_if_exists(username)
        if not check_if_user_allready_exists:
            if password == confirmed_password:
                hashed_password = hash_password(password)
                queries.add_user(username, hashed_password)

            else:
                print("Password does not match. Please, try again")
        else:
            print("Please choose another username")

    return render_template('register.html')


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get('password')
        check_if_user_exists_in_database = queries.verify_user_if_exists(
            username)
        if check_if_user_exists_in_database:
            if verify_password(password, check_if_user_exists_in_database[0]['password']):
                return redirect('/')
            else:
                print("password or username are not correct!")
        else:
            print("password or username are not correct!")
    return render_template('login.html')


# @app.route('/design')
# def design():
#     return render_template('design.html')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
