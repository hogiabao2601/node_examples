'use strict';

/**
 * Created by baohg on 26/05/2016.
 */
var em = require('./Raising');
console.log(em);
em.on('FirstEvent', function (data) {
  console.log('First subscriber: ' + data);
});