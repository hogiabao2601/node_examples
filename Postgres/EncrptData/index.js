'use strict';

/**
 * Created by baohg on 04/08/2016.
 */
var pg = require('pg');
var fs = require('fs');

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:ttkt@10.8.37.81:5432/payme';

function createTable() {
  pg.connect(connectionString, function (err, client, done) {
    if (err) throw err;
    var query = client.query('CREATE TABLE IF NOT EXISTS testuserscards(card_id SERIAL PRIMARY KEY, username varchar(100), cc bytea)');

    query.on('end', function () {
      client.end();
    });
  });
}

function insertData(data) {
  var pubKey = fs.readFileSync('public.key').toString();
  pg.connect(connectionString, function (err, client, done) {
    if (err) throw err;
    var sql = `INSERT INTO testuserscards(username, cc)
    VALUES ('${data.username}', pgp_pub_encrypt('${data.cc}', dearmor('${pubKey}')))`


    var query = client.query(sql);

    query.on('end', function () {
      client.end();
    });
  });
}

function selectData() {
  var secretKey = fs.readFileSync('secret.key').toString();
  pg.connect(connectionString, function (err, client, done) {
    if (err) throw err;
    var sql = `SELECT username, pgp_pub_decrypt(cc, dearmor('${secretKey}'), 'Palomino1!') As ccdecrypt
    FROM testuserscards`

    var query = client.query(sql);
    query.on('row', function(row) {
      console.log(row);
    });

    query.on('end', function () {
      client.end();
    });
  });
}

var data = {
  username: 'Ho Gia Bao',
  cc: 'Ho Gia Baogsdoijsdfjiosdfjsoaifjsfsfiosjfosiajfas'
}
//createTable();
insertData(data);
selectData()