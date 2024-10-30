import { unstable_cache } from "next/cache";
import { pb } from "../pb/pocket-base";
import { cookies } from "next/headers";

export async function getWikiByUser() {
	const cookieStore = await cookies();
	const pbCookie = cookieStore.get("pb_auth")?.value as string;
	pb.authStore.loadFromCookie(pbCookie);

	const fetchData = unstable_cache(
		async () => {
			return await pb.collection("wikis").getFullList();
		},
		["wikis"],
		{
			revalidate: 120,
			tags: ["wikis"],
		},
	);

	return fetchData();
}

export async function updateWikiByUser({
	wikiId,
	data,
}: { wikiId: string; data: any }) {
	await pb.collection("wikis").update(wikiId, data);
}
