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
        var port = Constants.WEB_SERVER_PORT;
        var app = Express();
        app.use(bodyParser.urlencoded({ extended: false}));
        app.use(bodyParser.json());

        // Testing webserver, keeping as an example of get
        // app.get("/", (req, res, next) => {
        //     res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
        // });

        app.post("/slack", async (req, res) => {
            console.log(req.body);
            res.sendStatus(200);
            if (req.body.type == "url_verification") {
                console.log("URL Verification Challenge: " + req.body.challenge);
                res.header({
                    "Content-type": "application/json"
                });
                res.json([req.body.challenge]);
            } else if (req.body.event.type == "app_mention") {
                let arText = req.body.event.text.split(" ");
                let slackProps = {};
                // Just blindly passing args through - TODO: Not this
                const fo = await foaas.getFO(Constants.URL_FOAAS, arText[1], arText[2]);
                let text = fo.message + "\n" + fo.subtitle;
                slackProps = {
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