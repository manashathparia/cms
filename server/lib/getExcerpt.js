const htmlParser = require("htmlparser2");

function getExcerpt(html) {
	let arr = [];
	const parser = new htmlParser.Parser(
		{
			ontext(text) {
				if (text !== "\n") {
					const _text = text.split(" ");
					arr = [...arr, ..._text];
				}
			},
		},
		{ decodeEntities: true }
	);
	parser.write(html);
	parser.end();
	return arr.slice(0, 50).join(" "); // max 50 words
}

module.exports = getExcerpt;
