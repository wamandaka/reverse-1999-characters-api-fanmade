const express = require("express");
const router = express.Router();
const {
  getCharacter,
  createCharacter,
  getCharacterBySlug,
  // getCharacterById,
} = require("../controller/character_controller");
const { restrict, Auth } = require("../middlewares/restrict");

router.get("/", getCharacter);
router.post("/", Auth, createCharacter);
router.get("/:slug", getCharacterBySlug);
// router.get("/:id", getCharacterById);

module.exports = router;
