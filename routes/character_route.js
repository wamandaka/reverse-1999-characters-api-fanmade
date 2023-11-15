const express = require("express");
const router = express.Router();
const {
  getCharacter,
  createCharacter,
} = require("../controller/character_controller");

router.get("/", getCharacter);
router.post("/", createCharacter);

module.exports = router
