# slack_foaas
Slackbot for inappropriate API calls

# State of the Slackbot
Runs a local webserver and will call the [FOAAS API](https://www.foaas.com/) with the arguments given after a user mention (@mr_robot). Then posts the response to the slack channel that it was requested in. Needs error handling, input validation, etc. Currently a walking skeleton, but it techinically works!

# Usage
_Note that this is using Windows CMD syntax. Someday I'll dual boot..._
1. Make sure [ngrok](https://ngrok.com/download "Download ngrok") is installed and in your path
2. Start ngrok in terminal
   1. `$ ngrok http <PORT>`
   2. `<PORT>` should be set in the [config constants](https://github.com/tbremm/slack_foaas/blob/master/config/constants.js#L11 "WEB_SERVER_PORT")
3. Note the URL in ngrok's output in the terminal. This will be different each time the tunnel is restarted.
4. Navigate to the project directory and start the program
   1. `$ node main/main.js`
5. Go to Slack to [verify the URL](https://api.slack.com/apps/AMH4N17RA/event-subscriptions?)
   1. This should be automatically handled by the program and should verify within a few seconds
6. Login to slack and go to the #tb_dev channel (private, ask for invite)
7. Enter the following:
   1. `@mr_robot arg1 arg2 ... argn`
   2. argx is the positional argument sent directly to [FOAAS](https://www.foaas.com/). 
      * For example: `@mr_robot cup Tim` should return `How about a nice cup of shut the fuck up? - Tim`
8. ...
9. Profit!

# Ideas
1. Provide menu of possible fuck offs
2. Add slash commands
3. Host on AWS with a static domain instead of locally