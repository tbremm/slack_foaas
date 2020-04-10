// This file is for communicating with Slack

const { WebClient } = require('@slack/web-api');
const Creds = require('../config/creds'); // Require the oath token
const ErrorCode = require('@slack/web-api');


class Slackbot {
    // Currently sends a basic text message to the default channel
    async send(slackProps) {
        const web = new WebClient(Creds.BOT_USER_OAUTH_ACCESS_TOKEN);
        let result;
        console.log(slackProps.text + ' ... ' + slackProps.channel);
        try  {
            result = await web.chat.postMessage({
                text: slackProps.text,
                channel: slackProps.channel
                // Will add more settings as we progress
            });
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                console.log(error.data);
            } else {
                console.log(error);
            }
        }
    }
}


module.exports = {
    Slackbot: Slackbot
}