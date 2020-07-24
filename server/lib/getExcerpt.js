const htmlParser = require("htmlparser2");

function getExcerpt(html) {
	let arr = [];
	const parser = new htmlParser.Parser(
		{
			ontext(text) {
				if (arr.length < 50 && text !== "\n") {
					const _text = text.split(" ");
					arr = [...arr, ..._text];
				}
			},
		},
		{ decodeEntities: true }
	);
	parser.write(html);
	parser.end();
	return arr.join(" ");
}

module.exports = getExcerpt;
