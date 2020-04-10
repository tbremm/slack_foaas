const Constants = require("../config/constants");
const Slack = require("./post_to_slack");
const Foaas = require("./foaas");

// Might be a better way to do this but
// the API calls are all async and this is
// what I found works (and online)
async function main() {
    foaas = new Foaas.Foaas();
    const fo = await foaas.getFO(Constants.URL_FOAAS, "outside", "Bindi", "Tim");

    let text = fo[0] + "\n\t\t" + fo[1];

    const channel = Constants.DEFAULT_CHANNEL_ID;
    const slackbot = new Slack.Slackbot();
    slackProps = {
        text: text,
        channel: channel
    };

    slackbot.send(slackProps);
}

main();