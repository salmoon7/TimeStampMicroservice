// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:timestamp", (req, res) => {
  const input = req.params.timestamp;

  // Try to parse the input as an integer (Unix timestamp)
  const unixTimestamp = parseInt(input, 10);
  if (!isNaN(unixTimestamp)) {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    if (!isNaN(date.getTime())) {
      const utcDate = date.toUTCString();
      const unixDate = unixTimestamp;
      return res.json({ unix: unixDate, utc: utcDate });
    }
  }

  // If parsing as an integer failed, assume it's a date string
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    const utcDate = date.toUTCString();
    const unixDate = date.getTime();
    return res.json({ unix: unixDate, utc: utcDate });
  }

  // If neither case matches, return an error
  return res.status(400).json({ error: "Invalid timestamp format." });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
