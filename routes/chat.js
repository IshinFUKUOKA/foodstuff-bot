const express = require('express');
const router = express.Router();
const action = require('../app/action');
const usage = require('../app/usage').text;
const request = require('request');

/* POST from slack. */
router.post('/', function(req, res, next) {
  res.header('Content-Type', 'text/plain;charset=utf-8');
  if(req.body.type == 'url_verification') {
    res.header('Content-Type', 'text/plain;charset=utf-8');
    let challenge = req.body.challenge;
    res.status(200).send(challenge)
  } else {
    // TODO Token check
    let text = req.body.text;
    let response_url = req.body.response_url;
    console.log('text: ' + text);
    console.log('response_url: ' + response_url);
    // 半角 or 全角スペースで区切り
    commands = text.split(/\ |　/);
    // TODO Validation check
    if (!commands[0]) {
      res.end('コマンドエラー。\n' + usage);
    }
    // get Message
    action.execute(commands, function(err, data) {
      if(err) {
        console.log("Error: " + err);
        res.end(err);
      }
      let message = data;
      // call Slack API
      var headers = { 'Content-type': 'application/json' }
      var options = {
        url: process.env.WEBHOOK_URL,
        headers: headers,
        json: {
          text: message
        }
      }
      request.post(options, function(err, response, body){
        if(err) {
          logger.error(err);
          res.end("NG:" + err);
        } else {
          res.status(200).end("OK");
        }
      });
    });
  }
});

module.exports = router;
