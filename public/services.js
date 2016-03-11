'use strict';

var app = angular.module('travelApp');

app.service('Travels', function($http){

  this.get = function(){
    return $http.get('/destinations');
  }

  this.create = function(destination){
    return $http.post('/destinations', destination);
  }

  this.remove = function(destination){
    console.log("destination.id", destination.id);
    var id = destination.id;
    return $http.delete(`/destinations/${id}`, destination);
  }

  this.update = function(destination){
    console.log("destination in services", destination);
    var id = destination.id;

    return $http.put(`/destinations/${id}`, destination);
  }

}); //end app.service
