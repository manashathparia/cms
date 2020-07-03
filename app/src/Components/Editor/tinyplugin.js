import tinymce from "tinymce/tinymce";
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
	const { onClose, selectedValue, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value) => {
		onClose(value);
	};

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
		>
			<DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
			<Paper>Div</Paper>
		</Dialog>
	);
}

export default function Foo() {
	const [open, toggleOpen] = useState(false);
	const [selectedValue, setSelectedValue] = React.useState(emails[1]);
	const _editor = useRef();
	useEffect(() => {
		tinymce.PluginManager.add("example", function(editor, url) {
			// Add a button that opens a window
			_editor.current = editor;
			editor.ui.registry.addButton("example", {
				text: "Email",
				onAction: function() {
					toggleOpen(!open);
				},
			});

			return {
				getMetadata: function() {
					return {
						name: "Example plugin",
						url: "http://exampleplugindocsurl.com",
					};
				},
			};
		});
	}, []);

	const handleClose = (value) => {
		toggleOpen(false);
		setSelectedValue(value);
		_editor.current.insertContent("Email: " + selectedValue);
	};

	return open ? (
		<SimpleDialog
			selectedValue={selectedValue}
			open={open}
			onClose={handleClose}
		/>
	) : null;
}
