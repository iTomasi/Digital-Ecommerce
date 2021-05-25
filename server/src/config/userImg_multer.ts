import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		cb(null, `user__${Date.now()}${path.extname(file.originalname)}`);
	},
	destination: path.join(__dirname, '../../public/users'),
});

export default multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype === 'image/jpeg' ||
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/svg+xml' ||
			file.mimetype === 'image/gif'
		) {
			return cb(null, true);
		}

		return cb(null, false);
	},
}).single('userImg');
