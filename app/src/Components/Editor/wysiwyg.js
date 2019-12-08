import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraftjs from "html-to-draftjs";
import draftJstoHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./wysiwyg.css";

export default function Wysiwyg({ body, onChange }) {
	const [wordCounter, updateWordCounter] = useState(0);

	const html = htmlToDraftjs(body);
	const contentState = ContentState.createFromBlockArray(html.contentBlocks);
	const editorState = EditorState.createWithContent(contentState);

	const countLength = html =>
		html.match("<p></p>") ? 0 : html.trim().split(/\s+/).length;

	useEffect(() => {
		updateWordCounter(countLength(body));
	}, [body]);

	const handleEditorChange = state => {
		const textFromState = state.getCurrentContent().getPlainText();
		updateWordCounter(countLength(textFromState));
	};
	const handleChange = state => onChange(draftJstoHtml(state));

	return (
		<React.Fragment>
			<Editor
				defaultEditorState={editorState}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wysiwyg"
				editorClassName="wysiwyg-editor"
				onChange={handleChange}
				onEditorStateChange={handleEditorChange}
			/>
			<div
				style={{
					border: "1px solid #dad5d5",
					borderTop: "none",
					padding: "2px",
					textAlign: "right",
					background: "white"
				}}
				id="word-counter"
			>
				Words: {wordCounter}
			</div>
		</React.Fragment>
	);
}
