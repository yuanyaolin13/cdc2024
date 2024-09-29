from flask import Flask, jsonify, render_template
import json

app = Flask(__name__)

# Load the JSON data once when the app starts
with open("attractions.json", "r") as file:
    attractions = json.load(file)

@app.route('/', methods=['GET'])  # Define a route for the homepage
def home():
    return render_template('index.html')  # Render the index.html file

@app.route('/api/getAttractions', methods=['GET'])
def get_attractions():
    return jsonify(attractions)  # Serve the data as JSON

if __name__ == '__main__':
    app.run(debug=True)  # Run the app
