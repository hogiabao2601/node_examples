'use strict';

/**
 * Created by baohg on 20/06/2016.
 */
var cheerio = require('cheerio');

var $ = cheerio.load('<span id="disabled_TAR.ACCT.NAME" class="disabled_dealbox" style="width:2.53em;">VND-TGTT-HO VIET THUYEN</span>');

console.log($('span[id="disabled_TAR.ACCT.NAME"]').text());