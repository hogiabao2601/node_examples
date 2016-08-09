'use strict';

/**
 * Created by baohg on 20/07/2016.
 */
const request = require('request');
const async = require('async');
const es = require('elasticsearch');
const fs = require('fs');

var STORE = {
  host: 'itracking.io',
  port: '9200',
  index: 'installs',
  mappingPath: 'installs.json',
  type: 'access',
  scroll: '60s',
  search_type: 'scan'
};

var client;

function connected(callback) {
  if (client) {
    callback(client);
    return;
  }
  var host = STORE.host;
  var port = STORE.port;
  var connectionString = `${host}:${port}`;

  client = new es.Client({
    host: connectionString,
    log: 'error'
  });

  client.ping({
    requestTimeout: Infinity,
    hello: "elasticsearch!"
  }, function (error) {
    if (error) {
      console.error('[ELASTICSEARCH] cluster is down!');
    } else {
      console.info('[ELASTICSEARCH] connection is ok');
    }
  });
  callback(client);
};

var fields = [ 'country',
  'city',
  'gaid',
  'ipPublic',
  'brandModel',
  'storeCallback',
  'imsi',
  'clientVersion',
  'deviceId',
  'platform',
  'telcoId',
  'is3g',
  'ipPrivate',
  'screenSize',
  'wid',
  'osVersion',
  'requestId',
  'appId',
  'packageName',
  'email',
  'ram',
  'timestamp',
  'brandName',
  'utmSource',
  'cLang',
  'trackId',
  'idfa',
  'utmTerm',
  'cpu',
  'userAgent',
  'utmCampaign',
  'is3G',
  'pData',
  'accountId',
  'macAddress',
  'isWifi',
  'imei',
  'sLang',
  'sdkVersion',
  'utmMedium',
  'partnerId',
  'isOther' ]

var allDocs = [];
function getAllDocs(cb) {
  connected((client)=> {
    client.search({
      index: STORE.index,
      scroll: STORE.scroll,
      search_type: STORE.search_type,
    }, function getMoreUntilDone(error, response) {
      response.hits.hits.forEach(function (hit) {
        allDocs.push(hit['_source']);
      });
      if (response.hits.total !== allDocs.length) {
        // now we can call scroll over and over
        client.scroll({
          scrollId: response._scroll_id,
          scroll: STORE.scroll,
        }, getMoreUntilDone);
      } else {
        index_with_bulk()
      }
    });
  })
}

Array.prototype.compare = function(testArr) {
  for (var i = 0; i < this.length; i++) {
    if(testArr.indexOf(this[i]) == -1)
      return false;
  }
  return true;
}


function index_with_bulk(cb) {
  var bulk_request = [];
  console.log(allDocs.length);
  for (var i = 0; i < allDocs.length; i++) {
    var array1 = Object.keys(allDocs[i]);

    if(array1.compare(fields)) {
      bulk_request.push({index: {_index: STORE.index + 1, _type: STORE.type}});
      bulk_request.push(allDocs[i]);
    }
  }
  var len = 2000;
  console.log(bulk_request.length);
  while (bulk_request.length > 0) {
    var bk = bulk_request.splice(0, len);
    connected(function (client) {
      client.bulk({
        body: bk
      }, function (error, response, status) {
        if (error) {
          console.log(error);
        }
      });
    });
  }
}


function getAllFields(cb) {
  fs.readFile(STORE.mappingPath, (error, data)=> {
    data = data.toString()
    var index = JSON.parse(data);
    var mapFields = index[STORE.index]['mappings'][STORE.type]['properties']
    var fields = Object.keys(mapFields);
    console.log(fields);
  })

}

function initIndex() {
  fs.readFile(STORE.mappingPath, (error, data)=> {
    console.log(data.toString());
    var index = JSON.parse(data.toString());
    var body = {
      'mappings': index[STORE.index]['mappings']
    };
    console.log(body);
    connected(function (client) {
      client.indices.create({
        index: STORE.index,
        refresh: true,
        body
      }, function (error, response, status) {
        if (error) console.error(error);
      });
    })
  })
}

//getAllFields()
initIndex()
//
//async.series([
//  getAllDocs,
//  index_with_bulk
//])


