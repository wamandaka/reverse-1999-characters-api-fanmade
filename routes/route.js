const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const character = require("./character_route");
const auth = require("./auth_route");

router.use(morgan("dev"));
router.use("/api/v1/characters", character);
router.use("/auth", auth);

module.exports = router;
