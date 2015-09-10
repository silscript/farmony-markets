var express = require("express");
var router = express.Router();
var Market = require("../db/connection").models.Market;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

// Index route for markets.
router.get("/markets", function(req,res){
  if(req.accepts('json')) {
    Market.getLatLong().then(function(results) {
      res.json(results);
    })
  } else {
    Market.findAll().then(function(markets){
      res.render("markets/index", {markets: markets})
    })
  }
});


// Show route for markets.
router.get("/markets/:id", function(req,res){
  Market.findById(req.params.id).then(function(market){
    if(!market) return error(res, "not found");
    market.getVendors().then(function(vendors){
      res.render("markets/show", {market: market, vendors: vendors})
    });
  })
})

module.exports = router;
