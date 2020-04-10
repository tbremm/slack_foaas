const Constants = require("../config/constants");
const Slack = require("./post_to_slack");
const Foaas = require("./foaas");

// Might be a better way to do this but
// the API calls are all async and this is
// what I found works (and online)
async function main() {
    const foaas = new Foaas.Foaas();
    const slackbot = new Slack.Slackbot();
    const channel = Constants.DEFAULT_CHANNEL_ID;
    const fo = await foaas.getFO(Constants.URL_FOAAS, "tucker", "Tim");
    let text = fo.message + "\n" + fo.subtitle;
    let slackProps = {
        text: text,
        channel: channel
    };
    slackbot.send(slackProps);
}

main();