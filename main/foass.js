// This file is for communicating with the FOAAS API

const axios = require("axios");
const slack = require("./post_to_slack");

var headerOptions = {
    'Content-Type': 'application/json',
    'Accept': 'text/plain'
};

var url = 'https://www.foaas.com/awesome/Tim';

const getData = async url => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        slack.sendSlack(response.data.message + '\n\t' + response.data.subtitle);
    } catch (error) {
        console.log(error);
    }
};

getData(url);