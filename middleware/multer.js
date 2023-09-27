const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "YIMG" +
        "-" +
        Date.now() +
        Math.round(Math.random() * 1000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File Format not match"));
  }
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
