const http = require('node:http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    const isGet = req.url === '/' && req.method === 'GET';
    const isPost = req.url === '/users' && req.method === 'POST';
    const isFormDataPut = req.url === '/formdata' && req.method === 'PUT';

    switch (true) {
        case (isGet):

            res.writeHead(200, { 'Content-Type': 'text/html' });

            res.write('<html lang="en"><body><p>This is home Page.</p></body></html>');
            res.end();
            break;
        case(isPost):
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log(parse(body));
                res.end(JSON.stringify(parse(body)) );
            });
            break;
        case(isFormDataPut):
            req.setEncoding('latin1')
            let requestData = '';

            req.on('data', chunk => {
                console.log(chunk.toString())
                requestData += chunk.toString();
            });
            req.on('end', () => {
                console.log(requestData);
                res.end(JSON.stringify(parse(requestData)) );
            });
            break;
        default:
            res.writeHead(400);
            res.end('Invalid Request!');
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000);

console.log('Node.js web server at port 8000 is running...')
