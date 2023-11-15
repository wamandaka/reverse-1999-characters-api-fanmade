const express = require("express");
const router = express.Router();
const { register, dashboard } = require("../controller/auth_controller");
const restrict = require("../middlewares/restrict");

router.post("/register", register);
const passport = require('../lib/passport');
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.get("/dashboard",restrict, dashboard);

module.exports = router;
