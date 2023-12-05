const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { ResponseTemplate } = require("../helper/template_helper");

async function register(req, res, next) {
  try {
    let { name, email, password } = req.body;
    let existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existUser) {
      let resp = ResponseTemplate(null, "User already exist", null, 200);
      res.json(resp);
      return;
    }
    let encriptedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: encriptedPassword,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
}

async function authUser(req, res, done) {
  try {
    let { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      let resp = ResponseTemplate(null, "User not found", null, 400);
      res.json(resp);
      return;
    }
    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      let resp = ResponseTemplate(null, "Incorrect password", null, 400);
      res.json(resp);
      return;
    }
    let token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY
    );
    let resp = ResponseTemplate({ user, token }, "Success", null, 200);
    res.json(resp);
  } catch (error) {
    done(error);
  }
}
async function dashboard(req, res, next) {
  // res.json(req.user);
  res.send("Dashboard");
}

function whoami(req, res) {
  return res.status(200).json({
    status: true,
    message: "success",
    data: {
      user: req.user,
    },
  });
}

module.exports = { register, authUser, dashboard, whoami };
