# Safeboda

## Technologies for this API creation: 
<br/><b>Language for backend</b>: javascript
<br/><b>For run javascript on the server</b>: nodejs(https://nodejs.org/es/)
<br/><b>Backend framework</b>: express(https://expressjs.com/es/)
<br/><b>Library for API documentation</b>: swagger(https://swagger.io/)
<br/><b>Test framework</b>: mocha(https://mochajs.org/)
<br/><b>Test framework assertion library</b>: chai(https://www.chaijs.com/)
<br/><b>Database engine</b>: mysql(https://www.mysql.com/)
<br/><b>Database model design</b>: mysql_workbench(https://www.mysql.com/products/workbench/)
<br/><b>Google api library</b>: @google/maps(https://www.npmjs.com/package/@google/maps)
<br/><b>Geaographic calculations library</b>: geolib(https://www.npmjs.com/package/geolib)
<br/><b>Nodejs dependency packages manager</b>: Yarn(https://yarnpkg.com/en/)

## Run the server
### Install dependencies packages:
```bash
  yarn install
```
### Configure database:
<b>Create the database</b>: Get into <i>mysql console</i> and run:
```mysql
  create database safeboda;
```
Edit <i>/config/config.js</i> file and change the database object attributes.
```javascript
  database: {
    database: 'safeboda',
    username: 'root',
    password: '',
    dialect: 'mysql',
    host: "127.0.0.1",
  },
```
To change default values of the config table edit <i>/config/config.js</i>
```javascript
   default_config_table: {
    promo_code_max_rides: 10,
    promo_code_radius: 10 * 1000, //10KM
    promo_code_duration: 24 * 60 * 60 * 1000, //one day
  }
```
<b>Initialize database</b>: run the init_db.js script that generate the initial state of the database.
```bash
  node ./init_db.js;
```
### Run the server:
For port configuration edit <i>/config/config.js</i> and change the server object port attribute
```javascript
  server: {
    protocol: "http",
    port: 9000,
    domain: "localhost",
  },
```
Put a valid google maps api key with the <a href="https://developers.google.com/maps/documentation/directions/start" target="_blank">directions api</a> activated
in <i>/config/config.js</i>
```javascript
  google_maps_api_key: "api_key_here",
```
Run the server
```bash
  yarn start
```

## Run some tests to the code
You need to have mocha installed globaly
```bash
  yarn global add mocha
```
Run tests
```bash
  yarn run tests
```
If you wanted to add more tests please edit <i>/tests/index.js</i>.

## Api documentation
With the server running go to (http://localhost:9000/api/docs).

You can find data model diagram on the <i>/doc</i> folder joined wih some screenshotes to postman(https://www.getpostman.com/).

## License
This code belongs to <b>Eduin Garcia Cordero</b> so please do not copy this repo.
