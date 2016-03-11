'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var filePath = path.join(__dirname, '../data/destinations.json');

var Destination =  {};

Destination.get = function(cb){
  fs.readFile(filePath, function(err, data){
    if(err){
      return cb(err);
    }
    //parse data
    var destinations = JSON.parse(data);
    cb(null, destinations);
  });
};

Destination.create = function(newDestination, cb){
  Destination.get(function (err, destinations){
    if (err) {
    return cb(err)
  }
  console.log("new destination", newDestination);
    newDestination.id = uuid();
    destinations.push(newDestination);
    fs.writeFile(filePath, JSON.stringify(destinations), cb);
  });
};

Destination.delete = function(id, cb){
  Destination.get(function(err, destinations){
    var destination = destinations.find(function(data){
      return data.id === id;
    });
    var index = destinations.indexOf(destination);
    destinations.splice(index, 1);
    fs.writeFile(filePath, JSON.stringify(destinations), cb);
  });
};

Destination.update = function(id, updatesObj, cb){
  Destination.get(function(err, destinations){
    if (err) return cb(err);
    var updatedDestination;
    destinations = destinations.map(function(destination){
      if (destination.id === id){
        for (var key in updatesObj){
          destination[key] = updatesObj[key];
        }
        updatedDestination = destination;
      }
      return destination;
    });

    if (!updatedDestination){
      cb({err: "destination not found"});
    }
      fs.writeFile(filePath, JSON.stringify(destinations), function(err){
        cb(err, updatedDestination);
      });
  });
};

module.exports = Destination;
