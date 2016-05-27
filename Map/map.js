'use strict';

/**
 * Created by baohg on 27/05/2016.
 */
var ES_DEVICE_INDEX = "demo";
var ES_DEVICE_TYPE = "demo";

var objs = [{a: 1}, {a: 2}, {a:3}];
var data = objs.map(function (obj) {
  return {
    update: {
      index: ES_DEVICE_INDEX,
      type: ES_DEVICE_TYPE,
      data: obj
    }
  }
});

function create_bulk (bulk_request) {
  var obj

  for (i = 0; i < xloop; i++) {
    obj = finaljson[1]
    // Insert header of record
    bulk_request.push({index: {_index: 'jsindex', _type: 'jstype', _id: i+1}});
    bulk_request.push(obj);
  }
  return bulk_request;
};

console.log(data);


