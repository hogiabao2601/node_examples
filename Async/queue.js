/**
 * Created by baohg on 6/13/16.
 */
var async = require('async');

var q = async.queue(function (task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

q.drain = function () {
    console.log('all items have been processed');
}

for(var i = 0; i < 100; i++){
    q.push({name: 'foo' + i});
}
//q.push({name: 'foo'}, function (err) {
//    console.log('finished processing foo');
//});
//q.push({name: 'bar'}, function (err) {
//    console.log('finished processing bar');
//});
//
//// add some items to the queue (batch-wise)
//
//q.push([
//    {name: 'baz'},
//    {name: 'bay'},
//    {name: 'bax'}], function (err) {
//    console.log('finished processing item');
//});
//
//q.unshift({name: 'bar----'}, function (err) {
//    console.log('finished processing bar-----');
//});

