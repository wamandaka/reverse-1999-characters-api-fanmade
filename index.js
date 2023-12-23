require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const router = require("./routes/route");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Setel opsi CORS sesuai kebutuhan Anda
const corsOptions = {
  origin: true, // Gantilah dengan origin aplikasi frontend Anda
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Misalnya, dalam Express.js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Gantilah dengan origin aplikasi frontend Anda
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

const authUser = require("./routes/auth_route");
app.use(authUser);

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
