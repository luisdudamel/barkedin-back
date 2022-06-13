const { initializeApp } = require("firebase/app");

const debug = require("debug")("barkedin:middlewares:firebase");
const chalk = require("chalk");

const fs = require("fs");
const path = require("path");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const firebaseUpload = async (req, res, next) => {
  const { file } = req;

  const firebaseConfig = {
    apiKey: "AIzaSyBxYBQwqvcF7aFYqnqxZzPeuc4XMkNKDHU",
    authDomain: "barkedin-b27f8.firebaseapp.com",
    projectId: "barkedin-b27f8",
    storageBucket: "barkedin-b27f8.appspot.com",
    messagingSenderId: "538904955581",
    appId: "1:538904955581:web:f5d28484f266123e00c5d4",
  };

  const firebaseApp = initializeApp(firebaseConfig);

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
            return;
          }
          req.body.picture = newFileName;

          fs.readFile(
            path.join("uploads", "images", newFileName),
            async (readError, readFile) => {
              if (readError) {
                debug(chalk.red("Error reading post picture"));

                next(readError);
                return;
              }
              const storage = getStorage(firebaseApp);

              const storageRef = ref(storage, newFileName);
              await uploadBytes(storageRef, readFile);
              const firebaseFileURL = await getDownloadURL(storageRef);

              req.body.picturebackup = firebaseFileURL;

              next();
            }
          );
        }
      );
    } else {
      next();
    }
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Error processing image";
    debug(chalk.red(error.message));

    next(error);
  }
};

module.exports = firebaseUpload;
