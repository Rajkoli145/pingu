const express = require("express");
const router = express.Router();
const commandCenterController = require("../controllers/commandCenterController");

router.get("/", commandCenterController.getSummary);

module.exports = router;
