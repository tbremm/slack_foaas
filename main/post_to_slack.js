const { WebClient } = require('@slack/web-api');
var Constants = require('../config/constants.js');
var ErrorCode = require('@slack/web-api');

const token = Constants.BOT_USER_OAUTH_ACCESS_TOKEN;
const conversationId = Constants.TB_DEV_CHANNEL_ID;

// Initialize
const web = new WebClient(token);

(async () => {
    let result;
    try  {
        // Post a message to the channel, await results
        // https://api.slack.com/methods/chat.postMessage
        result = await web.chat.postMessage({
            text: 'Hello world',
            channel: conversationId
        });

        // Result contains an ID for the message 'ts'
        console.log('Successfully sent "' + result.message.text + '" as ' + result.message.username + ' in conversation ' + conversationId);
    } catch (error) {
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            console.log(error.data);
        }
    }
})();