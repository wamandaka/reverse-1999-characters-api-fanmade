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
    birthday,
    inspiration,
    slug
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
    birthday,
    inspiration,
    slug
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
        birthday      : true,
        inspiration   : true,
        slug          : true,
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

const ITEMS_PER_PAGE = 10; // Jumlah item per halaman

async function getCharacter(req, res) {
  const page = req.query.page || 1; // Halaman yang diminta (default: 1)
  const skip = (page - 1) * ITEMS_PER_PAGE; // Item yang akan dilewati

  try {
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
        birthday      : true,
        inspiration   : true,
        slug          : true,
      },
      skip, // Lewati sejumlah item
      take: ITEMS_PER_PAGE, // Ambil sejumlah item
    });

    const totalCharacters = await prisma.character.count(); // Hitung total karakter

    const totalPages = Math.ceil(totalCharacters / ITEMS_PER_PAGE); // Hitung total halaman

    let resp = ResponseTemplate(char, "Success", null, 200, {
      pagination: {
        page,
        totalPages,
        totalItems: totalCharacters,
      },
    });

    res.json(resp);
  } catch (error) {
    console.error("Error retrieving characters:", error);
    let resp = ResponseTemplate(
      null,
      "Error retrieving characters",
      error,
      500
    );
    res.status(500).json(resp);
  }
}


module.exports = {
  getCharacter,
  createCharacter,
};
