const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", lectureController.getAllLectures);
router.post("/", lectureController.createLecture);
router.put("/:id", lectureController.updateLecture);
router.delete("/:id", lectureController.deleteLecture);

module.exports = router;
