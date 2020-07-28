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

// console.log(
// 	getExcerpt(
// 		"<p><strong style=\"margin: 0px; padding: 0px; font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; text-align: justify; background-color: #ffffff;\">Lorem Ipsum</strong><span style=\"font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; text-align: justify; background-color: #ffffff;\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>"
// 	)
// );

module.exports = getExcerpt;
