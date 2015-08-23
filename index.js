// Require express.
// Connect express to application.
var express = require("express");
var app = express();

// Connecting to public assets.
app.use(express.static(__dirname + "/public"));

// Port listener.
app.listen(3000, function(){
  console.log("Listening on port 3000.");
});

// Connect to browser.
app.get("/", function(req, res){
  res.send("Browser time!");
});