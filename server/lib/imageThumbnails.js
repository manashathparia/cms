const sharp = require("sharp");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFilePromise = util.promisify(fs.readFile);

module.exports = async function(image) {
	const sizes = [
		[300, 300],
		[768, 384],
	];
	const promises = [];
	const files = [];
	const fileBuffer = await readFilePromise("./" + image.path);
	const fileDetails = path.parse(image.path);

	for (let i = 0; i < sizes.length; i++) {
		const outputFileName = `${fileDetails.dir}/thumbnail_${sizes[i][0]}x${sizes[i][1]}_${fileDetails.base}`;
		const p = sharp(fileBuffer)
			.resize(sizes[i][0], sizes[i][1])
			.toFile(outputFileName);

		promises.push(p);
		files.push(outputFileName);
	}
	await Promise.all(promises);
	return files;
};
