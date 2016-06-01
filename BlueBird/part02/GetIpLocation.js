'use strict';

/**
 * Created by baohg on 01/06/2016.
 */
var bluebird = require('bluebird');
var needle = require('needle');
var fs = require('fs');

var writeFileAsync = bluebird.promisify(fs.writeFile);
var getAsync = bluebird.promisify(needle.get);

var url = 'api.ipify.org/?format=json';
console.time('taskA');

var ipDecodePromise = getAsync(url)
    .then(function (res) {
        return res.body.ip;
    })
    .then(function (ip) {
        return getAsync('http://www.geoplugin.net/json.gp?ip=' + ip);
    });

ipDecodePromise
    .then(function (res) {
        console.log(res.body);
        console.timeEnd('taskA');
    })
    .catch(function (err) {
        console.error('Error:' + err);
    });

ipDecodePromise
    .then(function (response) {
        return writeFileAsync('ipdecode.txt', response[1]);
    })
    .then(function () {
        console.log('Write to file ipdecode.txt successfully');
    })
    .catch(function (e) {
        console.error('Error:' + e);
    });