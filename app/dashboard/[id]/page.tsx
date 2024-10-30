import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";
import { pb } from "@/lib/pb/pocket-base";
import { getCookies } from "@/lib/utils/cookie-utils";
import { WikisResponse } from "@/pocketbase-types";

export default async function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const id = (await params).id;

	const wikiPosts = await pb.collection("wikis").getList(1, 30, {
		expand: "wiki_posts",
	});

	console.log(wikiPosts);

	return (
		<div>
			<Tiptap wiki_posts_id={id} />
			<Button>get Wiki</Button>
		</div>
	);
}
