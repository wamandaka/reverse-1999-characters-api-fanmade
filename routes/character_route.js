const express = require("express");
const router = express.Router();
const {
  getCharacter,
  createCharacter,
} = require("../controller/character_controller");
const { restrict, Auth } = require("../middlewares/restrict");

router.get("/", getCharacter);
router.post("/", Auth, createCharacter);

module.exports = router;
