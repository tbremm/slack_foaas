const constants = require('../config/constants');
const slack = require('./post_to_slack');
const foaas = require('./foaas');
const express = require('express');
const bodyParser = require('body-parser');

async function main() {
    try {
        const myFoaas = new foaas.Foaas();
        const slackbot = new slack.Slackbot();
        // Start up the web server
        // To expose it online, run 'ngrok http <Constants.WEB_SERVER_PORT>' on the terminal
        // (must have ngrok installed and in path)
        // Whenever you restart ngrok, make sure to validate the new URL:
        // https://api.slack.com/apps/AMH4N17RA/event-subscriptions?
        // TODO: use ngrok programmatically, maybe
        var port = constants.WEB_SERVER_PORT;
        var app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        const operations = await myFoaas.getOperations(constants.URL_FOAAS);


        app.post('/slack', async (req, res) => {
            console.log(req.body);
            // Respond to verification requests
            // TODO - Verify that it's slack sending messages
            if (req.body.event.type === 'app_mention') {
                try {
                    res.sendStatus(200);
                    let arText = req.body.event.text.split(' ');
                    arText.shift(); // Not passing the user ref to foaas
                    // Just blindly passing args through - TODO: verification, error handling
                    if (arText[0] === 'operations') {
                        const ops = await myFoaas.getOperations(constants.URL_FOAAS);
                        let slackProps = {
                            text: JSON.stringify(ops, null, 4),
                            channel: req.body.event.channel
                        };
                        slackbot.send(slackProps);
                    } else {
                        const fo = await myFoaas.getFO(constants.URL_FOAAS, arText);
                        // TODO - Handle when message/subtitle don't exist due to error
                        let text = fo.message + '\n' + fo.subtitle;
                        // TODO - Enrich messages
                        let slackProps = {
                            text: text,
                            channel: req.body.event.channel,
                        //     blocks: {[
                        //         {
                        //             "type": "actions",
                        //             "elements": [
                        //                 {
                        //                     "type": "button",
                        //                     "text": {
                        //                         "type": "plain_text",
                        //                         "text": "My Button",
                        //                         "emoji": false
                        //                     }
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // }
                        };
                        slackbot.send(slackProps);
                    }
                } catch (error) {
                    console.log(error);
                    let slackProps = {
                        text: 'An error has occurred:\n\n' + error,
                        channel: req.body.event.channel
                    };
                    slackbot.send(slackProps);
                }
            } else if (req.body.type === 'url_verification') {
                // console.log('URL Verification Challenge: ' + req.body.challenge); // DEBUG
                res.header({
                    'Content-type': 'application/json'
                });
                // Need to return a copy of their challenge to verify the request URL
                res.json([req.body.challenge]);
            } else {
                res.sendStatus(200);
                console.log(error);
                let slackProps = {
                    text: 'An unhandled event type has occurred: ' + req.body.event.type,
                    channel: req.body.event.channel
                };
                slackbot.send(slackProps);
            }
        });

        app.listen(port, () => {
            console.log('Server running on port ' + port.toString());
        });

    } catch (error) {
        console.log('main: ' + error);
        process.exit(-1);
    }
}

main();