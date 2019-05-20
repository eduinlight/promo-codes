# Safeboda

Technologies for the API creation: 
<br/><b>Language for backend</b>: javascript
<br/><b>For run javascript on the server</b>: nodejs
<br/><b>Backend framework</b>: express()
<br/><b>Library for API documentation</b>: swagger()
<br/><b>Test framework</b>: mocha()
<br/><b>Test framework help library</b>: chai()
<br/><b>Database engine</b>: mysql()
<br/><b>Database model design</b>: mysql_workbench()
<br/><b>Google api library</b>: @google/maps()
<br/><b>Geaographic calculations library</b>: geolib()
<br/><b>Yarn</b>: nodejs packages manager()


## Run the server
### Install packages dependencies:
```bash
  yarn install
```
### Configure database:
<b>Create the database</b>: Get into <i>mysql</i> console and run:
```mysql
  create database safeboda;
```
Edit <i>/config/config</i> file and change the database object attributes.
```javascript
  database: {
    database: 'safeboda',
    username: 'root',
    password: '',
    dialect: 'mysql',
    host: "127.0.0.1",
  },
```
To change default values of the config table edit <i>/config/config</i> file
```javascript
   default_config_table: {
    promo_code_max_rides: 10,
    promo_code_radius: 10 * 1000, //10KM
    promo_code_duration: 24 * 60 * 60 * 1000, //one day
  }
```
<b>Initialize database</b>: run the init_db.js script that generate the first state of the database.
```bash
  node ./init_db.js;
```
### Run the server:
For port configuration edit <i>/config/config</i> file and change the server object port attribute
```javascript
  server: {
    protocol: "http",
    port: 9000,
    domain: "localhost",
  },
```
Put a valid google maps api key with the <a href="" target="_blank">directions api</a> activated
in <i>/config/config</i>
```javascript
  google_maps_api_key: "api_key_here",
```
Run the server
```bash
  yarn start
```

## Run some tests to the code
```bash
  yarn run tests
```
If you wanted to add more tests to the code please edit <i>/tests/index.js</i> file.

## Api documentation
With the server running go to (http://localhost:9000/api/docs).

You can find data model diagram on the <i>/doc</i> folder joined wih some screenshotes to postman(http://localhost).

## License
[LICENSE](https://github.com/eduinlight/safeboda/blob/master/LICENSE).
