'use strict';

var express = require('express');
var router = express.Router();

var Destination = require('../models/destination');

router.get('/', function(req, res){
  Destination.get(function(err, destinations){
    //is the second argument an array?
    if (err){
      return res.status(400).send(err);
    }
    res.send(destinations);
  });
}); //end get

router.get('/:id', function(request, response){
  Destination.get(function(err, destinations){
    if (err){
      return response.status(400).send(err);
    }
    var id = request.params.id;
    var destination = destinations.find(function(destinationObj){
      return destinationObj.id === id;
    });
  });
}); // end get to id

router.post('/', function(req, res){
  var newDestination = req.body;
  console.log("req.body", req.body);
  Destination.create(newDestination, function(err){
    console.log("newDestination", newDestination);
    if (err) return res.status(400).send(err.message);
    res.send(newDestination);
  });
}); //end post

router.delete('/:id', function(request, response){
  var id = request.params.id;
  Destination.delete(id, function(err){
    if (err){
      response.status(400).send(err);
    } else {
      response.send();
    }
  });
});

router.put('/:id', function(req, res){
  console.log("req params", req.params.id);
  var id = req.params.id;
  var updatesObj = req.body;
  console.log("req.body", req.body);

  Destination.update(id, updatesObj, function(err, updatedDestination){
    if (err) res.status(400).send(err)
    res.send(updatedDestination);
  });
});

module.exports = router;
