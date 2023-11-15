require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const router = require("./routes/route");
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))

const passport = require('./lib/passport');
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

const authUser = require('./routes/auth_route')
app.use(authUser)

app.use("/", router)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
