import React, { useEffect } from "react";
import tinymce from "tinymce/tinymce";
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
	"formatselect |  example bold italic | alignleft aligncenter alignright | numlist bullist | image table link  | undo redo | code  | searchreplace ";

export default function Wysiwyg({ body, onChange }) {
	useEffect(() => {
		tinymce.init({
			selector: "#tiny",
			plugins: ["paste", "link"],
		});
	});
	return (
		<div>
			<Plugin />
			<Editor
				value={body}
				init={{
					plugins:
						"visualblocks example link image code lists searchreplace wordcount imagetools ",
					toolbar: options,
					menubar: false,
					height: 500,
					image_uploadtab: true,
					images_upload_url: "/api/upload/image",
					image_advtab: true,
					mobile: {
						menubar: true,
					},
				}}
				onEditorChange={onChange}
			/>
		</div>
	);
}
