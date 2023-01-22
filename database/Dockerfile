# specify base image that we want to extend
FROM kartoza/postgis:15-3.3

RUN apt-get update
# add ogr2ogr
RUN apt-get install -y osm2pgsql wget
# RUN apt-get install -y ogr2ogr wget

RUN mkdir -p /importdata

COPY combined_dataset_kindergartens.geojson /importdata/combined_dataset_kindergartens.geojson
COPY import_script.sh /docker-entrypoint-initdb.d/import_script.sh
