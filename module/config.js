const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'pdfs/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

let apiKey = ''; // Ensure this is mutable

module.exports = {
    upload,
    apiKey
};
