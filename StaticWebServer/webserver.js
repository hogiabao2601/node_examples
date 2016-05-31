/**
 * Created by techmaster on 6/16/15.
 */
"use strict";
const http = require('http');
const fs = require('fs');
const url = require('url');

function serveFile(res, path) {
    let extension =  path.split('.').pop();
    var contentType;
    switch (extension) {
        case 'js':
            contentType = 'text/javascript';
            break;
        case 'htm':
            contentType = 'text/html';
            break;
        case 'jpeg':
            contentType = 'image/jpeg';
            break;
        case 'jpg':
            contentType = 'image/jpg';
            break;
        case 'png':
            contentType = 'image/png';
            break;
        default:
            contentType = 'unknown';
            res.end();
            return;
    }
    res.writeHead(200, {'Content-Type': contentType});

    let stream = fs.createReadStream('.' + path);
    stream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        stream.pipe(res);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    stream.on('error', function(err) {
        console.log('Error at: .' + path);
        res.end(err);
    });

}
//Hàm này xử lý các route
let handleGETRequest = function(res, url_parsed) {
    let path = url_parsed.pathname;
    switch (path) {
        case "/": //Nếu route đến trang chủ
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readdir('.', function(err, files){
                for (var i=0; i < files.length; i++){
                    res.write('<a href="/' + files[i] + '">' + files[i] + '</a></br>');
                }
                res.end();
            });
            break;
        case "/tom":
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200, 'json content');
            res.write('{"characters": ["Tom", "Jerry"]}');
            res.end();
            break;
        default:
            if (path.includes('.')){
                serveFile(res, path);
            }
            break;
    }
};

const server = http.createServer();
server.on('request', function(req, res) {
    if (req.method === 'GET') {
        handleGETRequest(res, url.parse(req.url, true));
    }
});
console.time('xx');

var port = 3000;
server.listen(port);

console.log('Server running at http://127.0.0.1:' + port);
console.timeEnd('xx');
