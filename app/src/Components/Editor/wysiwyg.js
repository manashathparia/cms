import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/plugins/paste";
import "tinymce/plugins/link";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/image";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import Plugin from "./imageInserterPlugin";
import { ImageInserter } from "../ImageSelector";
// import "tinymce/skins/content/default/content.css";
// import "tinymce/skins/ui/oxide/content.min.css";
// import "tinymce/skins/ui/oxide/skin.min.css";
// Create a symlink in public/static/js to /app/node_modules/tinymce/skins or use the above imports

const options =
	"formatselect | bold italic | alignleft aligncenter alignright | numlist bullist | imageInserter table link  | undo redo | code  | searchreplace ";

export default function Wysiwyg({ body, onChange, refs }) {
	const editorRef = useRef();
	const [showImageSelector, toggleImageSelector] = useState(false);

	function handleImageInsert(img) {
		const image = `
		<img src=/${img.path} width=200 alt=${img.alt_text || ""}>`;

		editorRef.current.insertContent(image);
	}

	return (
		<div>
			<ImageInserter
				show={showImageSelector}
				onClose={() => toggleImageSelector(!showImageSelector)}
				handleInsert={handleImageInsert}
			/>
			{/*
				when toggleImageSelector is passed to Plugin and called it causes memory leak warning,
				i am not able to find the cause of the error so i created a span with onClick 
				and click the span from plugin using document.que..().click()
			*/}
			<span
				id="imgbtn"
				onClick={() => toggleImageSelector(!showImageSelector)}
			/>
			<Plugin />
			<div className="editorContainer">
				<Editor
					value={body}
					init={{
						plugins:
							"visualblocks imageInserter link image code lists searchreplace wordcount imagetools ",
						toolbar: options,
						menubar: false,
						height: 498,
						image_advtab: true,
						init_instance_callback: (e) => (editorRef.current = e),
						branding: false,
					}}
					onEditorChange={onChange}
				/>
			</div>
		</div>
	);
}
