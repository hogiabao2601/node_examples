/**
 * Created by baohg on 6/13/16.
 */
var request = require('request');
var fs = require('fs');
var _ = require('lodash');
var cheerio = require('cheerio');
var async = require('async');

// đường dẫn để crawl
var url = 'http://dzut-co-hon.tiki.vn/result?page=';

// hàm thực hiện truy vấn HTML và bóc tách dữ liệu
function crawl(currentPage, callback) {
    console.log('Going to crawl page: ' + url + currentPage);
    request(url + currentPage, function (r, e, b) {
        var $ = cheerio.load(b);
        var $rows = $('tbody tr');
        if ($rows.length > 0) {
            var rows = [];
            $rows.each(function () {
                rows.push({
                    email: $(this).find('td').eq(0).text(),
                    product: $(this).find('td').eq(1).text(),
                    batch: $(this).find('td').eq(2).text(),
                    time: $(this).find('td').eq(3).text(),
                    result: $(this).find('td').eq(4).text(),
                });
            });
            // ghi kết quả ra file: results/[page].json
            fs.writeFileSync('./results/' + currentPage + '.json', JSON.stringify(rows, undefined, 2));
            callback();
        } else {
            console.log('ended');
            callback();
        }
    });
}

// quản lý hàng đợi, thực hiện 10 requests / thời điểm, tránh thực hiện DDOS server tiki
var queues = async.queue(function (page, done) {
    crawl(page, done);
}, 10);

// thực hiện xong
queues.drain = function () {
    console.log('ALL DONE!');
}

//16000 là số trang kết quả của tiki
for (var _i = 0; _i < 16000; _i++) {
    queues.push(_i);
}


