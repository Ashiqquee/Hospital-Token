const multer = require("multer");
const path = require("path");


function createMulter() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });

    const upload = multer({ storage: storage });
    return upload;
}


module.exports = {
    createMulter,
};

