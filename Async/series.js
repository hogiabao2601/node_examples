'use strict';

/**
 * Created by baohg on 31/05/2016.
 */
/** async.series nhằm mục đích chạy hết tất cả các hàm lần lượt, ở mỗi hàm khi chạy sẽ gọi một
 * hàm callback trả về một giá trị. Cuối cùng tất cả các giá trị sẽ được được đưa xuống hàm
 * callback cuối cùng để thực hiện.
 * @type {exports|module.exports}
 */
const async = require("async");
const fs = require('fs');

var openFiles = ["/test.json", "/prod.json", "/dev.json"];

var f1 = openFiles[0];

// Giả lập 1 tác vụ trong đó có truy xuất I/O
function one(callback) {
  fs.readFile(__dirname + f1, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    try {
      var configs = JSON.parse(data);
      console.log(configs);
      callback(null, 1);
    } catch (e) {
      return callback(e);
    }
  });
};

// Giả lập 1 tác vụ không truy xuất I/O
function two(callback) {
  for(var i = 0; i < 10; i++){
    console.log(i);
  }
  callback(null, 2);
};

// Mọi thứ được thực hiện theo đúng thứ tự
async.series({
  one,
  two
}, function (err, results) {
  console.log(results);
});

/*Khác nhau của series và waterfall là:
  * Serise sẽ trả về 1 kết quả cuối cùng để thực hiện trong callback
  * Waterfall thì lấy giá trị trả về của function trên để làm giá trị đầu vào cho function dưới
 */