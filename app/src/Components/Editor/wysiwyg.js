import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./wysiwyg.css";

const options =
	"undo redo | bold italic | alignleft aligncenter alignright | numlist bullist | image table link  | code  | searchreplace ";

export default function Wysiwyg({ body, onChange }) {
	return (
		<div>
			<Editor
				value={body}
				init={{
					plugins: "link image code lists searchreplace wordcount",
					toolbar: options,
					menubar: false,
					height: 500,
					image_uploadtab: true,
					images_upload_url: "/api/upload/image",
					image_advtab: true
				}}
				onEditorChange={onChange}
			/>
		</div>
	);
}
