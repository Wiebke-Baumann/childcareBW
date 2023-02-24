import os
from flask import Flask, jsonify
from flask_cors import CORS
import json
import re

import psycopg2

app = Flask(__name__)
CORS(app)

@app.route('/pubs', methods=["GET", "POST"])
def pubs():
    query = """SELECT COALESCE(kiga.name, 'No name specified') as name, ST_Y(kiga.wkb_geometry) as latitude, ST_X(kiga.wkb_geometry) as longitude, 
    CAST(kiga.sum_children_kiga_age_new AS int) as children_kiga_age, CAST(kiga.occupancy_rate AS DECIMAL(4, 2)) as occupancy_rate,id_kindergarten as id
    FROM kindergartens kiga"""

    
    with psycopg2.connect(host=os.getenv('POSTGRES_HOST'), port=5432, dbname=os.getenv('POSTGRES_DB'), user=os.getenv('POSTGRES_USER'), password=os.getenv('POSTGRES_PASS')) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
    
    return jsonify([{'name': r[0], 'id':r[5], 'latitude': r[1], 'longitude': r[2], 'children_kiga_age': r[3], 'occupancy_rate': r[4]} for r in results]), 200

@app.route('/choropleth', methods=["GET", "POST"])
def choropleth():
    query = '''SELECT id_1km as id, st_asgeojson(wkb_geometry) as geometry, childcare_index, nr_children_kiga_age, total_population, nr_kiga_in_reach
FROM gridcells'''

    
    with psycopg2.connect(host=os.getenv('POSTGRES_HOST'), port=5432, dbname=os.getenv('POSTGRES_DB'), user=os.getenv('POSTGRES_USER'), password=os.getenv('POSTGRES_PASS')) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
    geojsons = []
    for result in results:
        geojsons.append({
            "type": "Feature",
            "id": result[0],
            "properties": {
                
                "index": float(result[2]),
                "nr_children_kiga_age": float(result[3]),
                "total_population": float(result[4]),
                "nr_kinga_in_reach": float(result[5])
            },
            "geometry": json.loads(result[1])

        })

    return jsonify({
        "type": "FeatureCollection", "features": geojsons
    }), 200

@app.route('/population', methods = ['GET', 'POST'])
def population():
    query = '''select id_1km as id, st_asgeojson(wkb_geometry) as geometry,total_population, nr_children_kiga_age, childcare_index
from gridcells'''
    with psycopg2.connect(host=os.getenv('POSTGRES_HOST'), port=5432, dbname=os.getenv('POSTGRES_DB'), user=os.getenv('POSTGRES_USER'), password = os.getenv('POSTGRES_PASS')) as conn:
        with conn.cursor() as cursor:
            cursor.execute(query)
            results = cursor.fetchall()
    geojsons = []
    for result in results:
        geojsons.append({
            'type': 'Feature',
            'id': result[0],
            'properties':{
                'population': float(result[2]),
                'children': float(result[3]),
                'index': float(result[4])
            },
            'geometry': json.loads(result[1])

        })
    return jsonify({
        "type": "FeatureCollection", "features": geojsons
    }), 200
