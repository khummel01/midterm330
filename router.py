from flask import Flask, url_for, redirect, render_template, request, Response, jsonify, json, request 
from flask_cors import CORS # comment out when on pythonanywhere
from pathlib import Path 
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}}) # comment out when on pythonanywhere

@app.route('/getbook')
def getlist():
	try:
		with open('bookList.txt') as f:
			json_list = f.read()
	except:
		json_list = "[]"

	resp = Response(json_list)
	resp.headers['Content-Type'] = 'application/json'

	return resp

# @app.route('/savelist', methods=['POST'])
# def savelist():
# 	data = request.data
# 	with open('shoppingCart.txt', 'wb') as f:
# 		f.write(data)

# 	return jsonify("OK")

# @app.route('/')
# def getindex():
# 	return redirect('/static/index.html')

if __name__ == '__main__':
	app.run(debug=True, port=5001)