const sharp = require("sharp");
const { readFile, writeFile } = require("fs/promises");

const resizeImage = async (req, res, next) => {
  const fileName = req.file.filename;

  try {
    const fileToResize = await readFile(`uploads/images/${fileName}`);

    const imageResized = await sharp(fileToResize)
      .webp({ quality: 70 })
      .toBuffer();

    await writeFile(`uploads/images/${fileName}`, imageResized);

    next();
  } catch (error) {
    error.customMessage = "Error resizing image";
    error.statusCode = 500;
    next(error);
  }
};

module.exports = resizeImage;
