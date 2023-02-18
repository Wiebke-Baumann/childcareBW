# childcareBW

Childcare Infrastructure in Baden-Württemberg
A project by 
Elena Putilova,
Wiebke Baumann,
Nele Hapig

## Datasources

OpenStreetMap for the Kindergartens
- extraction via Overpass Turbo
- N = 6178 kindergartens in Baden-Würtemberg

2011 National Census for the population Data
- Aggregated to 1sqkm
- Adjusted the number of children from under 10 to kindergarten-age (1-6)

## How to setup the project on you're own device
Requirements:
- Docker
- pgAdmin
Create a virtual environment or use the example given
````
cp example.env .env
````

Build the dockcer container
````
docker-compose up --build
````

If you want to run it in backgroud:
````
docker-compose up -d --build
````
How to reset/ delete the docker container
````
docker-compose down -v
````

How to connect to pgAdmin
1. "docker-compose up" on the folder assignment_3_works_Version1
2. open pgAdmin & connect the new server:
    1. log into pgAdmin with your normal password
	2. rightclick on Servers -> Register -> Server
	3. put in Name = GIS_project_Version1, Hostname/address = localhost, username = gis_user, password = gis_pass
    ( or what ever variables you have set in you .env file)
	4. don't change any of the other information that is already written into the fields!# childcareBW
