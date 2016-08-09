'use strict';

/**
 * Created by baohg on 14/07/2016.
 */
var mongo = require('./connection')

var b = new mongo();


var Connection = module.exports = function Connection(config, cb) {
  var self = this;
  console.log(self);
  // Hold the config object
  //this.config = config || {};

  // Build Database connection
  //this._buildConnection(function(err, db) {
  //  if(err) return cb(err);
  //  if(!db) return cb(new Error('no db object'));
  //
  //  // Store the DB object
  //  self.db = db;
  //
  //  // Return the connection
  //  cb(null, self);
  //});
};

Connection({a: 1}, ()=> {
})

var config = null
var c = config || {a: 3}
//console.log(c);

var b = module.exports = 10
console.log(this);

var Person = {
  name: "Tim",
  age: 28,

  greeting: function () {
    var self = this;
    console.log(self);
    return "Hello " + this.name + ".  Wow, you are " + this.age + " years old.";
  }
};

console.log(Person.greeting());
