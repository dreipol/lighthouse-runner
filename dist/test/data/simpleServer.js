"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const port = 8000;
const requestHandler = (request, response) => {
    response.end('Hello Node.js Server!');
};
const server = http.createServer(requestHandler);
function stop() {
    server.close();
    return Promise.resolve();
}
exports.stop = stop;
function start() {
    return new Promise((res, rej) => {
        server.listen(port, (err) => {
            if (err) {
                console.log('something bad happened', err);
                return rej(err);
            }
            return res(`<h1>Hello WOrld</h1>`);
        });
    });
}
exports.start = start;
//# sourceMappingURL=simpleServer.js.map