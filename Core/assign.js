/**
 * Created by baohg on 5/29/16.
 */

var flight = {status: "Flying"};

//Object is passed by reference by default
var byRefFlight = flight;

//This code really copies object to other instance
var byCopyFlight = Object.create(flight);

//byRefFlight.status = "Landing";
//console.log('flight.status = ' + flight.status + ". byRefFlight.status = " + byRefFlight.status);
//flight.status = Landing. byRefFlight.status = Landing


byCopyFlight.status = "Crash!";
console.log('flight.status = ' + flight.status + ". byCopyFlight.status = " + byCopyFlight.status);
//flight.status = Landing. byCopyFlight.status = Crash!