const multer = require('multer');
const imgTypes = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpeg',
    'images/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.split('.')[0].split(' ').join('_');
        const imgType = imgTypes[file.mimetype];
        console.log('before filename : ' + fileName)
        callback(null, fileName + '_' + Date.now() + '.' + imgType);
    }
});

module.exports = multer({ storage }).single('image');
