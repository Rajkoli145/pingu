const express = require("express");
const router = express.Router();
const commandCenterController = require("../controllers/commandCenterController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", commandCenterController.getSummary);

module.exports = router;
