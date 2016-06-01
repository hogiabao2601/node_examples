/**
 * Created by baohg on 6/1/16.
 */

var bluebird = require('bluebird');

function wait(miliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + miliSeconds);
}

var arr = [1, 2, 3];
function arrBlocking() {
    console.time('blocking');
    arr.map(function (item) {
        wait(1000);
        console.log(item + ' * 2 = ' + item * 2);
    });
    console.timeEnd('blocking');
}

function arrNonBlocking() {
    console.time('non-blocking');
    bluebird.map(arr, function (item) {
        wait(1000);
        console.log(item + ' * 2 = ' + item * 2);
    });
    console.timeEnd('non-blocking');
}

function arrNonBlockingNextTick() {
    arr.map(function (item) {
        process.nextTick(function (i) {
            wait(1000);
            console.log(item + ' * 2 = ' + item * 2);
        });
    });
}
arrBlocking();
arrNonBlocking();
arrNonBlockingNextTick();