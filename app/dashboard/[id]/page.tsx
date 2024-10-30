import Tiptap from "@/components/Tiptap";
import { Button } from "@/components/ui/button";

export default async function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const id = (await params).id;

	return (
		<div>
			<Tiptap wikiId={id} />
			<Button>get Wiki</Button>
		</div>
	);
}
