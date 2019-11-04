const express = require("express");
const router = express.Router();

router.get("/success", (req, res) => {
  console.log("/api/login/success");
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  console.log(req.session);
  res.send("success");
});

router.get("/failed", (req, res) => {
  console.log("/api/login/failed");
  res.send("failed");
});

module.exports = router;
