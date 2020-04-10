const Constants = require("../config/constants");
const Slack = require("./post_to_slack");
const Foaas = require("./foaas");

// Might be a better way to do this but
// the API calls are all async and this is
// what I found works (and online)
async function main() {
    Foaas.getFO(Constants.URL_FOAAS, "bag", "Tim");
    const fo = await Foaas.getFO(Constants.URL_FOAAS, "bag", "Tim");

    let text = fo[0] + "\n\t\t" + fo[1];

    const channel = Constants.DEFAULT_CHANNEL_ID;
    const slackbot = new Slack.Slackbot();
    slackbot.sendSlack(text, channel);
}

main();