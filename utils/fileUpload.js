const multer = require('multer');

exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
            if(file.fieldname === 'rcBook'){
                cb(null, './uploads/images/rcBook');
            } else if(file.fieldname === 'licence'){
                cb(null, './uploads/images/licence');
            } else if(file.fieldname === 'insurance'){
                cb(null, './uploads/images/insurance');
            }
        } else {
            cb(null, './uploads/other');
        }
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
