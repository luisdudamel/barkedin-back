const { readFile } = require("fs/promises");
const debug = require("debug")("barkedin:middlewares:firebase");
const chalk = require("chalk");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supaBaseUrl = process.env.SUPABASE_URL;
const supaBaseKey = process.env.SUPABASE_KEY;

const firebaseUpload = async (req, res, next) => {
  const { file } = req;

  const supabase = createClient(supaBaseUrl, supaBaseKey);
  const supaStorage = supabase.storage.from("barkedin-back");

  try {
    if (file) {
      const newFileName = file ? `${Date.now()}${file.originalname}` : "";

      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newFileName),
        async (error) => {
          if (error) {
            debug(chalk.red("Error renaming picture"));
            next(error);
          }

          const imagePath = path.join("uploads/images", newFileName);
          const fileData = await readFile(imagePath);
          await supaStorage.upload(`uploads/images/${newFileName}`, fileData);
          const {
            data: { publicUrl },
          } = supaStorage.getPublicUrl(`uploads/images/${newFileName}`);
          req.body.picture = publicUrl;
          req.body.picturebackup = publicUrl;

          next();
        }
      );
    }
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Error processing image";
    debug(chalk.red(error.message));
    next(error);
  }
};

module.exports = firebaseUpload;
