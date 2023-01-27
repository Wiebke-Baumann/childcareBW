import os
from flask import Flask, jsonify
from flask_cors import CORS

import psycopg2

app = Flask(__name__)
CORS(app)

@app.route('/pubs', methods=["GET", "POST"])
def pubs():
    query = """SELECT points.name, ST_Y(points.wkb_geometry) as latitude , ST_X(points.wkb_geometry) as longitude
FROM kindergartens points"""

    
    with psycopg2.connect(host=os.getenv('POSTGRES_HOST'), port=5432, dbname=os.getenv('POSTGRES_DB'), user=os.getenv('POSTGRES_USER'), password=os.getenv('POSTGRES_PASS')) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
    
    return jsonify([{'name': r[0], 'latitude': r[1], 'longitude': r[2]} for r in results]), 200
