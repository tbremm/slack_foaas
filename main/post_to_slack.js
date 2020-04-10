// This file is for communicating with Slack

const { WebClient } = require('@slack/web-api');
// const Constants = require('../config/constants.js');
const Creds = require('../config/creds'); // Require the oath token
const ErrorCode = require('@slack/web-api');


class Slackbot {
    // Send a basic text message to the default channel
    async send(text, channel) {
        const web = new WebClient(Creds.BOT_USER_OAUTH_ACCESS_TOKEN);
        let result;
        try  {
            // Post a message to the channel, await results
            result = await web.chat.postMessage({
                text: text,
                channel: channel
            });
            console.log('Successfully sent "' + result.message.text + '" as ' + result.message.username + ' in conversation ' + channel);
        } catch (error) {
            console.log('caught an error: ' + error);
            if (error.code === ErrorCode.PlatformError) {
                console.log(error.data);
            } else {
                console.log(error.data);
            }
        }
    }
}


module.exports = {
    Slackbot: Slackbot
}