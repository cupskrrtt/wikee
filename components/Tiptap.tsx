"use client";

import { pb } from "@/lib/pb/pocket-base";
import { WikiPostsRecord } from "@/pocketbase-types";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ wiki_posts_id }: { wiki_posts_id: string }) => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Hello World! 🌎</p>",
		immediatelyRender: false,
		onUpdate: async ({ editor }) => {
			//await pb.collection("wiki_posts").update(, wikiData);
		},
	});

	return <EditorContent editor={editor} className="focus:border-none" />;
};

export default Tiptap;
