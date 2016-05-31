/**
 * Created by baohg on 5/29/16.
 */
function now(txt) {
    console.log(new Date().toLocaleTimeString() + ' ' + txt);
}

function wait(miliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + miliSeconds) {}
}

now('> Start to wait');
wait(5000);
now('> Finish waiting');