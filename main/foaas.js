// This file is for communicating with the FOAAS API

const axios = require("axios");
//const Slack = require("./post_to_slack");

var headerOptions = {
    'Content-Type': 'application/json',
    'Accept': 'text/plain'
};

// url:     Base FOAAS URL
// arg1:    First argument to FOAAS api (https://www.foaas.com/arg1)
// arg2:    Second argument to FOAAS api (https://www.foaas.com/arg1/arg2)
const getFO = async (url, arg1, arg2) => {
//async function getFO(url, arg1, arg2) {
    try {
        const response = await axios.get(url + '/' + arg1 + '/' + arg2);
//        const slackbot = new Slack.Slackbot()
//        slackbot.sendSlack(response.data.message + '\n\t' + response.data.subtitle);
        return ([response.data.message, response.data.subtitle]);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getFO: getFO
}