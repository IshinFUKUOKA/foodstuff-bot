const express = require('express');
const router = express.Router();

/* GET from slack. */
router.get('/', function(req, res, next) {
  res.header('Content-Type', 'text/plain;charset=utf-8');
  res.status(200).end("OK");
});

/* POST from slack. */
router.post('/', function(req, res, next) {
  res.header('Content-Type', 'text/plain;charset=utf-8');
  let challenge = req.body.challenge;
  res.status(200).end(challenge)
});

module.exports = router;
