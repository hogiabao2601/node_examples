/**
 * Created by baohg on 6/13/16.
 */
// Load the full build.
var _ = require('lodash');

var a = _.chunk(['a', 'b', 'c', 'd'], 2);
console.log(a);

_.defer(function(stamp) {
    console.log(_.now() - stamp);
}, _.now());

for(var _i=0; _i < 16000; _i++) {

}