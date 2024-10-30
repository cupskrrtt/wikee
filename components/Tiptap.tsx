"use client";

import { pb } from "@/lib/pb/pocket-base";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ wikiId }: { wikiId: string }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Hello World! 🌎</p>",
		immediatelyRender: false,
		onUpdate: async ({ editor }) => {
			const wikiData = {
				content: editor.getJSON(),
			};

			try {
				await pb.collection("wikis").update(wikiId, wikiData);
			} catch (error) {
				console.log(error);
			}
		},
	});

	return <EditorContent editor={editor} className="focus:border-none" />;
};

export default Tiptap;
