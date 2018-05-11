const http = require('http');
const port = 8000;

const requestHandler = (request: any, response: any) => {
    response.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);

export function stop() {
    server.close();
    return Promise.resolve();
}

export function start() {
    return new Promise((res, rej) => {
        server.listen(port, (err: Error) => {
            if (err) {
                console.log('something bad happened', err);
                return rej(err);
            }

            return res();
        });
    });
}
