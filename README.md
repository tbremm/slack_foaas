# slack_foaas
Slackbot for inappropriate API calls

# State of the Slackbot
Runs a local webserver and will call the [FOAAS API](https://www.foaas.com/) with the arguments given after a user mention (@mr_robot). Then posts the response to the slack channel that it was requested in. Needs error handling, input validation, etc. Each time the webserver tunnel is created you have to reverify the URL with Slack because it's random each time because I'm too cheap to buy a paid ngrok subscription. Currently a walking skeleton, but it techinically works!

Most recent work is in constructing more fully-featured custom messages with the idea of providing a drop-down with the various base commands to select. This part is very much a WIP.

# Usage
_Note that this is using Windows CMD syntax. Someday I'll dual boot..._
1. Make sure [ngrok](https://ngrok.com/download "Download ngrok") is installed and in your path
2. Start ngrok in terminal
   1. `$ ngrok http <PORT>`
   2. `<PORT>` should be set in the [config constants](https://github.com/tbremm/slack_foaas/blob/master/config/constants.js#L11 "WEB_SERVER_PORT")
3. Note the Forwarding URL in ngrok's output in the terminal. This will be different each time the tunnel is restarted.
   ```ngrok by @inconshreveable                                                                                   (Ctrl+C to quit)
   Session Status                online
   Account                       tbremm (Plan: Free)
   Version                       2.3.35
   Region                        United States (us)
   Web Interface                 http://127.0.0.1:4040
   Forwarding                    http://055cf5b0.ngrok.io -> http://localhost:3000
   Forwarding                    https://055cf5b0.ngrok.io -> http://localhost:3000
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
3. Host on AWS with a static domain instead of locally with ngrok
