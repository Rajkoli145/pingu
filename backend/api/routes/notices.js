const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", noticeController.getAllNotices);
router.post("/", noticeController.createNotice);
router.put("/:id", noticeController.updateNotice);
router.delete("/:id", noticeController.deleteNotice);

module.exports = router;
