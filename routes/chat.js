const express = require('express');
const router = express.Router();
const action = require('../app/action');
const usage = require('../app/usage').text;
const request = require('request');

/* POST from slack. */
router.post('/', function(req, res, next) {
  // debug
  console.log('request body:' + JSON.stringify(req.body));
  res.header('Content-Type', 'text/plain;charset=utf-8');
  if(req.body.type == 'url_verification') {
    res.header('Content-Type', 'text/plain;charset=utf-8');
    let challenge = req.body.challenge;
    res.status(200).send(challenge)
  } else {
    // response message
    let message = 'zzz';
    // TODO Token check
    let text = req.body.event.text;
    // 半角 or 全角スペースで区切り
    commands = text.split(/\ |　/);
    // メンションを削除
    commands.shift();
    console.log('commands:' + commands);
    // TODO Validation check
    if (!commands[0]) {
      message = 'コマンドエラー。\n' + usage;
    }

    // get Message
    action.execute(commands, function(err, data) {
      if(err) {
        console.log("Error: " + err);
        res.end(err);
      }
      message = data;
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
