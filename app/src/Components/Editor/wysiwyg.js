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
import Plugin from "./tinyplugin";

import "./wysiwyg.css";
import { ImageInserter } from "../ImageSelector";
const options =
	"formatselect | bold italic | alignleft aligncenter alignright | numlist bullist | imageInserter table link  | undo redo | code  | searchreplace ";

export default function Wysiwyg({ body, onChange, refs }) {
	const editorRef = useRef();
	const [showImageSelector, toggleImageSelector] = useState(false);

	function handleImageInsert(img) {
		const image = `<img src=http://localhost:8080/${img.path} width=200 alt=${img.alt_text}>`;
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
				i am not able to find the source of the error so i created a span with onClick 
				and click the span from plugin using document.que..().click()
			*/}
			<span
				id="imgbtn"
				onClick={() => toggleImageSelector(!showImageSelector)}
			/>
			<Plugin />
			<Editor
				value={body}
				init={{
					plugins:
						"visualblocks imageInserter link image code lists searchreplace wordcount imagetools ",
					toolbar: options,
					menubar: false,
					height: 500,
					image_advtab: true,
					init_instance_callback: (e) => (editorRef.current = e),
					branding: false,
				}}
				onEditorChange={onChange}
			/>
		</div>
	);
}
