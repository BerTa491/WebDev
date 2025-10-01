from flask import Flask, request, render_template 

app = Flask(__name__)

@app.route('/submit', methods=["POST"]) 

def submit(): 

    username = request.form['username'] 

    message = request.form['message'] 
    return f"Thanks {username}, your message was: {message}" 

 
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about") 

def about(): 

     return render_template("about.html") 

if __name__ == "__main__":
    app.run(debug=True)

