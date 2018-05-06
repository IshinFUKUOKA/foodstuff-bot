const express = require('express');
const router = express.Router();
const action = require('../app/action');
const usage = require('../app/usage').text;

/* POST from slack. */
router.post('/', function(req, res, next) {
  res.header('Content-Type', 'text/plain;charset=utf-8');
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
    let message = data;
    res.end(message);
  });
});

module.exports = router;
