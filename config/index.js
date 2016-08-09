'use strict';

/**
 * Created by baohg on 20/07/2016.
 */
var config = require('config');
var dbConfig = config.get('logs');
console.log(dbConfig);

if (config.has('optionalFeature.detail')) {
  var detail = config.get('optionalFeature.detail');
}