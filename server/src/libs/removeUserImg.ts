import fsPromises from 'fs';
import path from 'path';

const fs = fsPromises.promises;

export default async (file: string) => {
	if (file === 'default.jpg') return;

	try {
		await fs.unlink(path.join(__dirname, '../../public/users/' + file));
	} catch (e) {
		console.log(e);
		console.log('removeUserImg() Error');
	}
};
