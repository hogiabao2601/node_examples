'use strict';

/**
 * Created by baohg on 14/06/2016.
 */
const request = require('request');
const cheerio = require('cheerio');

var url = 'https://www.fmbmwonline.com/corp/scripts/common/';

request.get(url, (err, res, body)=> {
  var $ = cheerio.load(body);

});