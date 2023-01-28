import os
from flask import Flask, jsonify
from flask_cors import CORS

import psycopg2

app = Flask(__name__)
CORS(app)

@app.route('/pubs', methods=["GET", "POST"])
def pubs():
    query = """SELECT COALESCE(kiga.name, 'No name specified') as name, ST_Y(kiga.wkb_geometry) as latitude, ST_X(kiga.wkb_geometry) as longitude, 
    CAST(kiga.sum_children_kiga_age_new AS int) as children_kiga_age, CAST(kiga.occupancy_rate AS DECIMAL(4, 2)) as occupancy_rate 
    FROM kindergartens kiga"""

    
    with psycopg2.connect(host=os.getenv('POSTGRES_HOST'), port=5432, dbname=os.getenv('POSTGRES_DB'), user=os.getenv('POSTGRES_USER'), password=os.getenv('POSTGRES_PASS')) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
    
    return jsonify([{'name': r[0], 'latitude': r[1], 'longitude': r[2], 'children_kiga_age': r[3], 'occupancy_rate': r[4]} for r in results]), 200
