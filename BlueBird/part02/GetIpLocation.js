'use strict';

/**
 * Created by baohg on 01/06/2016.
 */
var bluebird = require('bluebird');
var needle = require('needle');

var getAsync = bluebird.promisify(needle.get);