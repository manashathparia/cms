import React from "react";
import { Editor } from "@tinymce/tinymce-react";
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
const options =
	"formatselect | bold italic | alignleft aligncenter alignright | numlist bullist | imageInserter table link  | undo redo | code  | searchreplace ";

export default function Wysiwyg({ body, onChange, toggleImageSelector, refs }) {
	return (
		<div>
			<Plugin onClick={toggleImageSelector} />
			<Editor
				value={body}
				init={{
					plugins:
						"visualblocks imageInserter link image code lists searchreplace wordcount imagetools ",
					toolbar: options,
					menubar: false,
					height: 500,
					image_advtab: true,
					init_instance_callback: (e) => (refs.current = e),
					branding: false,
				}}
				onEditorChange={onChange}
			/>
		</div>
	);
}
