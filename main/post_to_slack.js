const { WebClient } = require('@slack/web-api');
const Constants = require('../config/constants.js');
const Creds = require('../config/creds');
const ErrorCode = require('@slack/web-api');

const token = Creds.BOT_USER_OAUTH_ACCESS_TOKEN;
const conversationId = Constants.DEFAULT_CHANNEL_ID;

// Initialize
const web = new WebClient(token);

const sendSlack = async text => {
    let result;
    try  {
        // Post a message to the channel, await results
        // https://api.slack.com/methods/chat.postMessage
        result = await web.chat.postMessage({
            text: text,
            channel: conversationId
        });
        console.log('Successfully sent "' + result.message.text + '" as ' + result.message.username + ' in conversation ' + conversationId);
    } catch (error) {
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            console.log(error.data);
        }
    }
}

module.exports = {
    sendSlack: sendSlack
}