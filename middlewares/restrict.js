const jwt = require("jsonwebtoken");
const restrict = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  // res.redirect("/auth/login");
  res.status(401).send("Unauthorized");
};

const Auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(authorization, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        error: err.message,
        data: null,
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  restrict,
  Auth,
};
