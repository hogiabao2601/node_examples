/**
 * Created by baohg on 5/29/16.
 */
function now(txt) {
    console.log(new Date().toLocaleTimeString() + ' ' + txt);
}

now('> Start to wait');
setTimeout(function() {
    now('> End of waiting');
}, 1);
now('> Do other task');
now('> Do other task1');
now('> Do other task2');
now('> Do other task3');
now('> Do other task4');
now('> Do other task5');
now('> Do other task6');
now('> Do other task7');

