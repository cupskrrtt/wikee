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

export async function getRandomRecord() {
	const cookieStore = await cookies();
	const pbCookie = cookieStore.get("pb_auth")?.value as string;
	pb.authStore.loadFromCookie(pbCookie);

	try {
		// First get total number of records
		const resultList = await pb.collection("wikis").getList(1, 1, {
			$autoCancel: false,
		});
		const totalItems = resultList.totalItems;

		if (totalItems === 0) {
			throw new Error("No records found in collection");
		}

		// Generate random index
		const randomIndex = Math.floor(Math.random() * totalItems);

		// Get record at random index
		const record = await pb.collection("wikis").getList(1, 1, {
			skip: randomIndex,
			$autoCancel: false,
		});

		return record.items[0];
	} catch (error) {
		console.error("Error getting random record:", error);
		throw error;
	}
}
