const Constants = require("../config/constants");
const Slack = require("./post_to_slack");
const Foaas = require("./foaas");


async function main() {
    try {
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
    } catch (error) {
        console.log('main: ' + error);
        process.exit(-1);
    }
}

main();