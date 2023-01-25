# childcareBW

## Setup
````
cp example.env .env
````

## Start
````
docker-compose up --build
````

If you want to run it in backgroud:
````
docker-compose up -d --build
````

## Reset
````
docker-compose down -v
````

## Connecting new server in pgAdmin:

1. "docker-compose up" on the folder assignment_3_works_Version1
2. open pgAdmin & connect the new server:
    1. log into pgAdmin with your normal password
	2. rightclick on Servers -> Register -> Server
	3. put in Name = GIS_project_Version1, Hostname/address = localhost, username = gis_user, password = gis_pass
    ( or what ever variables you have set in you .env file)
	4. don't change any of the other information that is already written into the fields!# childcareBW
