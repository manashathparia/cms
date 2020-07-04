export default function readFile(file) {
	return new Promise((resolve, reject) => {
		if (file) {
			try {
				const reader = new FileReader();
				reader.addEventListener("load", () => resolve(reader.result));
				reader.readAsDataURL(file);
			} catch (e) {
				reject(e);
			}
		}
	});
}
