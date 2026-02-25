from flask import Flask, render_template, redirect, jsonify, request
import pymysql

app = Flask(__name__)


# creates the connection to the DB. If the DB is not running, this will crash your server! (add a # to commment it out in that case)
conn = pymysql.connect(
  host='localhost', 
  user='root', 
  password='root', 
  database='the_base', 
  cursorclass=pymysql.cursors.DictCursor
)

@app.route("/api/insert_user", methods=['GET'])
def insertUserGET():
    data = request.args
    if not data:
        return jsonify({"status": "error", "message": "Invalid arguments"})
    if not 'email' in data: 

       return jsonify({"status": "error", "message": "Missing email"}) 
    if not 'lastName' in data: 

       return jsonify({"status": "error", "message": "Missing lastName"})
    if not 'firstName' in data: 

       return jsonify({"status": "error", "message": "Missing firstName"})
    lastName = data.get('last_name')
    firstName = data.get('first_name')
    email = data.get('email')

    instance = conn.cursor()
    instance.execute('INSERT INTO users (last_name, first_name, email) VALUES (%s, %s, %s)', 
                     (lastName, firstName, email))
    conn.commit()
    newID = instance.lastrowid
    return jsonify({"status": "created", "id": newID})
# starting with /api/ is not required, but it can be nice to separate human-readable pages from pages that are there to use the DB
@app.route("/api/get_all_users")
def getAllUsers():
    instance = conn.cursor()                    # starts an instance of the connection
    instance.execute('SELECT * FROM users')     # runs the "select all columns" query
    return jsonify(instance.fetchall())         # transforms the result in the JSON data format and returns all rows
@app.route("/api/get_all_scores")
def getAllScores():
    instance = conn.cursor()                    # starts an instance of the connection
    instance.execute("SELECT first_name, last_name, score FROM `the_base`.`users`join scores on users.id = scores.user_id;")     # runs the "select all columns" query
    return jsonify(instance.fetchall())         # transforms the result in the JSON data format and returns all rows
@app.route("/api/get_high_scores", methods=['GET'])
def getHighScores():
    data = request.args
    instance = conn.cursor()                    # starts an instance of the connection
    instance.execute("SELECT first_name, last_name, score FROM `the_base`.`users`join scores on users.id = scores.user_id Order by score desc LIMIT %s",int(data.get("number")))     # runs the "select all columns" query
    return jsonify(instance.fetchall())         # transforms the result in the JSON data format and returns all rows
@app.route("/api/add_score", methods=['GET'])
def getAddScore():
    data = request.args

    user_id = data.get("user_id")
    score = data.get('score')

    instance = conn.cursor()
    instance.execute('INSERT INTO scores (user_id, score) VALUES (%s, %s)', 
                     (user_id, score))
    conn.commit()
    newID = instance.lastrowid
    return jsonify({"status": "created", "id": newID})
@app.route("/api/get_user_scores", methods=['GET'])
def getUserScore():
    data = request.args

    user_id = data.get("user_id")
    score = data.get('score')

    instance = conn.cursor()                    # starts an instance of the connection
    instance.execute("SELECT first_name, last_name, score FROM `the_base`.`users`join scores on users.id = scores.user_id WHERE user_id = %s Order by score desc",int(data.get("user_id")))     # runs the "select all columns" query
    return jsonify(instance.fetchall())         # transforms the result in the JSON data format and returns all rows

@app.route('/submit', methods=["POST"]) 

def submit(): 

    username = request.form['username'] 

    message = request.form['message'] 
    return f"Thanks {username}, your message was: {message}" 

@app.route('/favicon.ico') 

def favicon(): 

    return redirect("/static/favicon.ico") 
 
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about") 

def about(): 

     return render_template("about.html") 


@app.route("/api/get_comments", methods=['GET'])
def getTODO():
    data = request.args
    arg1 = data.get('page') # this is the name used in the URL to send stuff here
    
    instance = conn.cursor()
    instance.execute(
        'SELECT author_name, message FROM comments WHERE page_name = %s',
        (arg1,)
    )
    results = instance.fetchall()
    
    return jsonify({
        'status': 'success',
        'TODO': results  # this TODO name is later used in javascript
    })



if __name__ == "__main__":
    app.run(debug=True)

