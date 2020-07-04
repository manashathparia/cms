import tinymce from "tinymce/tinymce";
import { useEffect } from "react";

export default function Foo({ onClick }) {
	useEffect(() => {
		tinymce.PluginManager.add("imageInserter", function(editor, url) {
			editor.ui.registry.addIcon(
				"img",
				`<svg width="24" height="24">
					<path d="M5 15.7l3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 
						1.9V5H5v10.7zM5 18V19h3l2.8-2.9-2-2L5 17.9zm14-3l-2.5-2.4-6.4 6.5H19v-4zM4 3h16c.6
						0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 01-1-1V4c0-.6.4-1 1-1zm6
						8a2 2 0 100-4 2 2 0 000 4z" fill-rule="nonzero">
					</path>
				</svg>`
			);
			editor.ui.registry.addButton("imageInserter", {
				icon: "img",
				onAction: function() {
					onClick();
				},
			});
		});
	}, [onClick]);

	return null;
}
