import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		if (file.fieldname === "productImg") {
            return cb(null, `productimg__${Date.now()}${path.extname(file.originalname)}`)
        }

        else if (file.fieldname === "productFile") {
            return cb(null, `productfile__${Date.now()}${path.extname(file.originalname)}`)
        }
	},

	destination: (req, file, cb) => {
		if (file.fieldname === 'productImg') {
			return cb(null, path.join(__dirname, '../../public/products'));
		} else if (file.fieldname === 'productFile') {
			return cb(null, path.join(__dirname, '../../productsFiles'));
		}
	},
});

export default multer({
	storage,

    fileFilter: (req, file, cb) => {
        if (file.fieldname === "productImg") {
            if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif" || file.mimetype === "image/svg+xml") {
                return cb(null, true)
            }

            return cb(null, false)
        }

        return cb(null, true)
    }
}).fields([
	{ name: 'productImg', maxCount: 1},
	{ name: 'productFile', maxCount: 1 },
]);
