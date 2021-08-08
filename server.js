// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let param = req.params.date;
  let unixTime = "";
  let utcTime = "";
  if(parseInt(param) == param){
    unixTime = parseInt(param);
    utcTime = new Date(unixTime).toUTCString();
  } 
  else{
    let date = new Date(param);
    utcTime = date.toUTCString();
    unixTime = Date.parse(date);
  }
  if(utcTime === "Invalid Date"){
      res.json({ error : "Invalid Date" });
    } else{
      res.json({"unix":unixTime, "utc":utcTime});    
    }
  
});

app.get("/api", function (req, res) {
  let utcTime = new Date().toUTCString();
  let unixTime = Date.now();
  res.json({"unix":unixTime, "utc":utcTime});
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
