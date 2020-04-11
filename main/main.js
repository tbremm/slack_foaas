const Constants = require("../config/constants");
const Creds = require("../config/creds");
const Slack = require("./post_to_slack");
const Foaas = require("./foaas");
const Express = require("express");
const bodyParser = require("body-parser");

async function main() {
    try {
        const foaas = new Foaas.Foaas();
        const slackbot = new Slack.Slackbot();
        // Start up the web server
        // To expose it online, run "ngrok http <Constants.WEB_SERVER_PORT>" on the terminal
        // (must have ngrok installed and in path)
        // Whenever you restart ngrok, make sure to validate the new URL:
        // https://api.slack.com/apps/AMH4N17RA/event-subscriptions?
        // TODO: use ngrok programmatically, maybe
        var port = Constants.WEB_SERVER_PORT;
        var app = Express();
        app.use(bodyParser.urlencoded({ extended: false}));
        app.use(bodyParser.json());

        app.post("/slack", async (req, res) => {
            console.log(req.body);
            res.sendStatus(200);
            // Respond to verification requests
            // TODO - Verify that it's slack sending messages
            if (req.body.type == "url_verification") {
                // console.log("URL Verification Challenge: " + req.body.challenge); // DEBUG
                res.header({
                    "Content-type": "application/json"
                });
                // Need to return a copy of their challenge to verify the request URL
                res.json([req.body.challenge]);
            } else if (req.body.event.type == "app_mention") {
                let arText = req.body.event.text.split(" ");
                arText.shift(); // Not passing the user ref to foaas
                // Just blindly passing args through - TODO: verification, error handling
                const fo = await foaas.getFO(Constants.URL_FOAAS, arText);
                // TODO - Handle when message/subtitle don't exist due to error
                let text = fo.message + "\n" + fo.subtitle;
                // TODO - Enrich messages
                let slackProps = {
                    text: text,
                    channel: req.body.event.channel
                };
                slackbot.send(slackProps);
            }
        });

        app.listen(port, () => {
            console.log("Server running on port " + port.toString());
        });

    } catch (error) {
        console.log('main: ' + error);
        process.exit(-1);
    }
}

main();