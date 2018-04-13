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

function start() {
    return new Promise((res, rej) => {
        server.listen(port, (err) => {

            if (err) {
                console.log('something bad happened', err);
                return rej(err);
            }

            return res();
        });
    });
}

module.exports = {
    stop,
    start
};
