'use strict';

var app = angular.module('travelApp');

app.controller('mainCtrl', function($scope, Travels) {

  console.log("yay");

  Travels.get()
    .then(function(res) {
      var destinations = res.data;
      console.log("get res data", res.data);
      $scope.destinations = destinations;
    }, function(err) {
      console.error("error", err);
    });

  $scope.addDestination = function() {
    Travels.create($scope.newDestination)
      .then(function(res) {
        $scope.destinations.push(res.data);
      }, function(err) {
        2
        console.error(err);
      });
  };

  $scope.removeDestination = function(destination) {
    Travels.remove(destination)
      .then(function() {
        var index = $scope.destinations.indexOf(destination);
        console.log("index", index);
        $scope.destinations.splice(index, 1);
      }, function(err) {
        console.error(err);
      });
  };

  var thisDestination;
  var newDestinationObj;
  $scope.prePopDestination = function(destination) {
    thisDestination = this.$index;
    console.log("destination", this);
    console.log("this destination", thisDestination);
     newDestinationObj = angular.copy(this.destination);
    $scope.editDestination = newDestinationObj;
  };


  $scope.updateDestination = function(editDestination) {
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, save it!",
      closeOnConfirm: false
    }, function() {
      swal("Saved!", "Your information has been saved.", "success");
    });

    console.log("editDestination outer", editDestination);
    Travels.update(editDestination)
      .then(function(res) {
        console.log("res data update", res.data);
        var index = thisDestination;
        $scope.destinations.splice(index, 1, $scope.editDestination);
      }, function(err) {

      });
  }; //end updateDestionation();

}); //end controller
