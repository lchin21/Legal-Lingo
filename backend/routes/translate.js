const express = require("express");
const router = express.Router();
const translateController = require("../controllers/translateController");

router.post("/", translateController.callTranslate);

module.exports = router;
