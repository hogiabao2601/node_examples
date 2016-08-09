'use strict';

/**
 * Created by baohg on 29/06/2016.
 */
var DeathByCaptcha = require("deathbycaptcha");
var fs = require('fs');

var dbc = new DeathByCaptcha("hogiabao2601", "Palomino3#");

dbc.solve(fs.readFileSync("captcha.png"), function (err, id, solution) {
  if (err) return console.error(err);
  console.log("CAPTCHA solution is", solution);
});

dbc.balance(function (err, credits, balance, rate) {
  if (err) return console.error(err);
  console.log(credits + " credits remaining");
  console.log("($" + (balance / 100) + " @ " + rate + "c/solution");
});
