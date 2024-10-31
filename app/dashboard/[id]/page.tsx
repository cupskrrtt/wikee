import Blocknote from "@/components/blocknote";
import { pb } from "@/lib/pb/pocket-base";
import { getCookies } from "@/lib/utils/cookie-utils";

export default async function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	await getCookies();

	const data = await pb.collection("wikis").getOne(id);

	return <Blocknote initialContent={data.content} id={id} />;
}
