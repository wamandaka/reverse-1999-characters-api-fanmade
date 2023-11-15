const { ResponseTemplate } = require("../helper/template_helper");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCharacter(req, res) {
  const {
    name,
    afflatus,
    damage_type,
    rarity,
    medium,
    fragrance_note,
    tags,
    description,
  } = req.body;

  const payload = {
    name,
    afflatus,
    damage_type,
    rarity,
    medium,
    fragrance_note,
    tags,
    description,
  };

  try {
    const char = await prisma.character.create({
      data: payload,
      select: {
        id            : true,
        name          : true,
        afflatus      : true,
        damage_type   : true,
        rarity        : true,
        medium        : true,
        fragrance_note: true,
        tags          : true,
        description   : true,
      },
    });
    let resp = ResponseTemplate(char, "Success", null, 200);
    res.json(resp);
    return;
  } catch (error) {
    // let resp = ResponseTemplate(null, "Internal Server Error", error, 500);
    // res.json(resp);
    console.log(error);
    return;
  }
}

async function getCharacter(req, res) {
  const char = await prisma.character.findMany({
    select: {
      id            : true,
      name          : true,
      afflatus      : true,
      damage_type   : true,
      rarity        : true,
      medium        : true,
      fragrance_note: true,
      tags          : true,
      description   : true,
    },
  });
  let resp = ResponseTemplate(char, "Success", null, 200);
  res.json(resp);
}

module.exports = {
  getCharacter,
  createCharacter,
};
