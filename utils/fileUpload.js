const multer = require('multer');
const path = require('path');

exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'airport' || 'state' || 'city') {
            cb(null, './uploads/img/bulkUpload');
        }
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
            if (file.fieldname === 'rcBook') {
                cb(null, './uploads/img/driverDetails/rcBook');
            } else if (file.fieldname === 'licence') {
                cb(null, './uploads/img/driverDetails/licence');
            } else if (file.fieldname === 'insurance') {
                cb(null, './uploads/img/driverDetails/insurance');
            } else if (file.fieldname === 'trip') {
                cb(null, './uploads/img/trip');
            } else if (file.fieldname === 'profile') {
                cb(null, './uploads/img/profile');
            }
            else {
                cb(null, './uploads/other');
            }
        }
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        // cb(null, file.originalname)
    }
});
