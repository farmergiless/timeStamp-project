// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 4000

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

app.get("/api", (req, res) => {
  const currentTime = new Date()
  res.json({unix: Date.parse(currentTime), utc: currentTime.toString()})
})

app.get("/api/:date", (req, res) => {
    const dateParam = req.params.date
    if (Date.parse(dateParam) === "Invalid Date") {
      res.json({error: "Invalid Date"})
    } else if (dateParam.indexOf("-") === -1) {
      const utcTime = new Date(Number(dateParam))
    const unixTime = Date.parse(utcTime)
    res.json({unix: unixTime, utc: utcTime.toString()})
    } else {
      const unixTime = Date.parse(dateParam)
      const utcTime = new Date(Number(unixTime))
      res.json({unix: unixTime, utc: utcTime.toString()})
    }
})



// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
