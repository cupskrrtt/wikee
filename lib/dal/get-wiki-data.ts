import { pb } from "@/lib/pb/pocket-base";
import { WikisResponse } from "@/pocketbase-types";

export async function getWikiByUser(): Promise<WikisResponse[]> {
	const data = await pb.collection("wikis").getFullList();

	return data;
}
