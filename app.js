const mysql = require("mysql2");
const express = require("express");
const cors = require('cors')
const Axios = require('axios');
const bodyParser = require('body-parser');

var path = require('path');
const FORGE_CLIENT_ID = "3ytcIEPclEcrOUWH6d6dYQsTRx9A1OIS";
const FORGE_CLIENT_SECRET = "WRKbZ4kUXR5l4ORz";

 
const app = express();
const urlencodedParser = express.urlencoded({extended: false});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const querystring = require('querystring');
let access_token = '';
const scopes = 'data:read data:write data:create bucket:create bucket:read';

 
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "mysql.hosting.nic.ru",
  user: "alex683275_bazau",
  database: "alex683275_baza",
  password: "Auesila_1488"
});
 
app.use(cors());
app.set("view engine", "hbs");
 
 
app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get("/data", function(req, res){
    pool.query("SELECT * FROM Types", function(err, data){
        if(err) return console.log(err);
        data = data.map(el => {
            return {
                num: el.type_id,
                urn: el.forge_urn,
                description: el.type_name,
                link: el.picture,
            }
        })
        res.json(data)
    })

})

app.get('/oauth', function (req, res) {//авторизация в Forge
    Axios({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
            client_id: FORGE_CLIENT_ID,
            client_secret: FORGE_CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: scopes
        })
    })
        .then(function (response) {
            // Success
            access_token = response.data.access_token;
            res.send(response.data)
        })
        .catch(function (error) {
            // Failed
            console.log(error);
            res.send('Failed to authenticate');
        });
});