// This file is for communicating with Slack

const { WebClient } = require('@slack/web-api');
const errorcode = require('@slack/web-api');
// The creds are not going in the public github
// Currently you only need the BOT_USER_OAUTH_ACCESS_TOKEN
// Contact admin for a token.
const creds = require('../config/creds'); 


class Slackbot {
    // Currently sends a basic text message to the default channel
    async send(slackProps) {
        const web = new WebClient(creds.BOT_USER_OAUTH_ACCESS_TOKEN);
        let result;
        try  {
            result = await web.chat.postMessage({
                text: slackProps.text,
                channel: slackProps.channel
                // Will add more settings as we progress
            });
        } catch (error) {
            if (error.code === errorcode.PlatformError) {
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