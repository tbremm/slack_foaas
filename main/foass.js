// This file is for communicating with the FOAAS API

const pkgRequest = require('request');
var http = require('http');

var headerOptions = {
    'Content-Type': 'application/json',
    'Accept': 'text/plain'
};

var myLink = 'https://www.foaas.com/awesome/Tim';

await getFuckYou(headerOptions, myLink);
console.log('Done awaiting on getFuckYou');

async function getFuckYou (header, link) {
    try {
        const fuResponse = await sendFURequest(header, link);
    } catch (err) {
        console.log(err);
    }
    console.log(fuResponse);
}

async function sendFURequest (header, link) {
    let resp = await pkgRequest.get({
        headers: header,
        uri: link
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            return response.body;
        } else {
            console.log(error);
            console.log(response.statusCode);
            return null;
        }
    });
}