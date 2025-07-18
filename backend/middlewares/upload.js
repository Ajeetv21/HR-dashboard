const multer = require("multer")

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./files");
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;