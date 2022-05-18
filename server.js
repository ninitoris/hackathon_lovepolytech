const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const initRoutes = require("./backend/routes");

const PORT = process.env.PORT || 3001;
 
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/picture', express.static(__dirname + '/pictures'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


// app.use(/^\/$/, function (req, res) {//default url
//   res.redirect("/data");
// });


app.use(cors());
app.use(express.static(__dirname + '/backend/public'))
app.set("view engine", "hbs");
 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/backend/public/index.html')
})

initRoutes(app);



app.listen(PORT, () => {
  console.log(`сервер -> http://localhost:${PORT}`);
});


