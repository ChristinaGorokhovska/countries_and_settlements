const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "images/");
    },
    filename(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
        console.log(file);
    },
});

const types = ["image/png", "image/jpeg", "image/jpj"];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({ storage, fileFilter });
