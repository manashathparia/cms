import React, { useState, useEffect } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { connect } from "react-redux";
import htmlToDraftjs from "html-to-draftjs";
import draftJstoHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { updateEditorBody } from "../../Actions/editorActions";
import "./wysiwyg.css";

function Wysiwyg(props) {
	const [wordCounter, updateWordCounter] = useState(0);

	const html = htmlToDraftjs(props.body);
	const contentState = ContentState.createFromBlockArray(html.contentBlocks);
	const editorState = EditorState.createWithContent(contentState);

	useEffect(() => {
		updateWordCounter(props.body.trim().split(/\s+/).length);
	}, [props.body]);

	const handleEditorChange = state => {
		const textFromState = state.getCurrentContent().getPlainText();
		updateWordCounter(textFromState.trim().split(/\s+/).length);
	};

	return (
		<React.Fragment>
			<Editor
				defaultEditorState={editorState}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wysiwyg"
				editorClassName="wysiwyg-editor"
				onChange={props.handleEditorChange}
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
			>
				Words: {wordCounter}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = ({ editor }) => ({ body: editor.body });

const mapDispatchToProps = dispatch => ({
	handleEditorChange(state) {
		dispatch(updateEditorBody(draftJstoHtml(state)));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Wysiwyg);
