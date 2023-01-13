const http = require('http');
const axios = require('axios')
let FormData = require('form-data');

// GET
http.get('http://localhost:8000', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(data);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

// POST
const data = JSON.stringify({
    name: 'John Doe',
    job: 'Content Writer'
});

const postOptions = {
    host: 'localhost',
    port: 8000,
    path: '/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const postRequest = http.request(postOptions, (res) => {
    let data = '';

    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body: ', data);
    });

}).on("error", (err) => {
    console.log("Error: ", err.message);
});

postRequest.write(data);
postRequest.end();

// PUT
const formData = new FormData();
formData.append('name', 'Viktor');
formData.append('phone', '89882349823');

axios({
    method: "put",
    url: "http://localhost:8000/formdata",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
})
