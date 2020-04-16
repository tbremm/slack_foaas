// This file is for communicating with Slack
const creds = require('../config/creds'); // Contact space admin for the required creds
const errorcode = require('@slack/web-api');
const foaas_ops = require('../data/foass_operations.json');
const fs = require('fs');
const { WebClient } = require('@slack/web-api');


class Slackbot {
    constructor() {
        this.web = new WebClient(creds.BOT_USER_OAUTH_ACCESS_TOKEN);
    }

    // Currently sends a basic text message to the default channel
    async send(slackProps) {
        let result;
        try  {
            result = await this.web.chat.postMessage(slackProps);
        } catch (error) {
            if (error.code === errorcode.PlatformError) {
                console.log('Platform error: ' + error.data);
            } else {
                console.log(error);
            }
        }
    }

    // Validates the the input is an actual operation,
    // and that the number of args matches what is expected.
    // args:    Array (operational arguments,
    //          in the order that FOAAS expects:
    //          [operation, arg1, arg2, ..., argn])
    // returns: boolean (true if valid)
    async validateOperation(args) {
        let jsonData = {}
        fs.readFile('../data/foaas_operations.json', 'utf-8', (err, data) => {
            if (err) throw err;
            jsonData = JSON.parse(data);
        });
        console.log(jsonData);
    }
}


module.exports = {
    Slackbot: Slackbot
}