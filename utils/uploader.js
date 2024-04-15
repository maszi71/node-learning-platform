const multer = require("multer");
const path = require("path");

module.exports = (type,folderName , limitSize) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "public", "courses", folderName));
    },
    filename: function (req, file, cb) {
      const format = path.extname(file.originalname);
      const fileName = Date.now() + Math.random();
      if(type ==="image") {
        const validFormat = [".jpg", ".jpeg", ".png"];
        if (validFormat.includes(format)) {
                cb(null , `${fileName}${format}`)
        } else {
          cb(new Error("Format is not Valid"));
        }
      } else {
        cb(null , `${fileName}${format}`)
      }
    },
  });
  return multer({ storage: storage , limits : {
    fileSize : limitSize
  } })
};
