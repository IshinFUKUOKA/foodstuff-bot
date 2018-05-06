var express = require('express');
var router = express.Router();

/* POST from slack. */
router.post('/', function(req, res, next) {
  // TODO Token check
  let text = req.body.text;
  let response_url = req.body.response_url;
  console.log("text: " + text);
  console.log("response_url: " + response_url);
  // 半角 or 全角スペースで区切り
  res.json({ message: "hello!" });
});

module.exports = router;
