const sharp = require("sharp");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFilePromise = util.promisify(fs.readFile);

module.exports = async function(image) {
	const sizes = [
		{ width: 300, height: 300 },
		{ width: 768, height: 384 },
	];
	const promises = [];
	const files = [];
	const fileBuffer = await readFilePromise("./" + image.path);
	const fileDetails = path.parse(image.path);

	for (let i = 0; i < sizes.length; i++) {
		const outputFileName = `${fileDetails.dir}/thumbnail_${sizes[i].width}x${sizes[i].height}_${fileDetails.base}`;
		const p = sharp(fileBuffer)
			.resize(sizes[i].width, sizes[i].height)
			.toFile(outputFileName);

		promises.push(p);
		files.push(outputFileName);
	}
	await Promise.all(promises);
	return files;
};
