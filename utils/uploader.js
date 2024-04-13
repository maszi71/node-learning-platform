const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "courses", "covers"));
  },
  filename: function (req, file, cb) {
    console.log(file)
    const validFormat = [".jpg", ".jpeg", ".png"];
    const format = path.extname(file.originalname);
    if (validFormat.includes(format)) {
      const fileName = Date.now() + Math.random()
            cb(null , `${fileName}${format}`)
    } else {
      cb(new Error("Format is not Valid"));
    }
  },
});

const uploader = multer({ storage: storage });

module.exports = uploader;
