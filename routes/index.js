const express = require('express');
const router = express.Router();

/* GET from slack. */
router.get('/', function(req, res, next) {
  res.header('Content-Type', 'text/plain;charset=utf-8');
  res.send(200).send("OK");
});

/* POST from slack. */
router.post('/', function(req, res, next) {
  res.header('Content-Type', 'text/plain;charset=utf-8');
  let challenge = req.body.challenge;
  res.status(200).send(challenge)
});

module.exports = router;
