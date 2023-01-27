#!/bin/bash

# we are now inside the linux environment of our PostGIS container
echo "Hi from the import script"

# move into importdata directory
cd /importdata


echo "ogr2ogr start importing to $POSTGRES_DB with user $POSTGRES_USER"

ogr2ogr -f "PostgreSQL" PG:"host=localhost dbname=$POSTGRES_DB user=$POSTGRES_USER password=$POSTGRES_PASS" "/importdata/gridcells_final.geojson" -nln gridcells

ogr2ogr -f "PostgreSQL" PG:"host=localhost dbname=$POSTGRES_DB user=$POSTGRES_USER password=$POSTGRES_PASS" "/importdata/kindergartens_final.geojson" -nln kindergartens

echo "Import script execution completed"