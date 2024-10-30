"use server";

import { pb } from "@/lib/pb/pocket-base";
import { WikiPostsRecord } from "@/pocketbase-types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface FormState {
	message: string;
}

export async function createWikiAction(
	_state: FormState,
	data: FormData,
): Promise<FormState> {
	const cookieStore = await cookies();
	const pb_cookie = cookieStore.get("pb_auth")?.value;

	//TODO: create a helper function to validate and generate cookie

	pb.authStore.loadFromCookie(pb_cookie as string);

	if (!pb.authStore.isValid) {
		pb.collection("users").authRefresh();
		const newCookie = pb.authStore.exportToCookie({ secure: false });
		cookieStore.set("pb_auth", newCookie, {
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
			httpOnly: process.env.NODE_ENV === "production",
		});
	}

	const userId = pb.authStore.model?.id;

	const formData = {
		user_id: userId,
		name: data.get("name"),
		description: data.get("description"),
	};

	try {
		const data = await pb.collection("wikis").create(formData);
		const wikiData: WikiPostsRecord = {
			wiki_id: data.id,
		};
		await pb.collection("wiki_posts").create(wikiData);
		revalidatePath("/dashboard");
		return {
			message: "success",
		};
	} catch (error) {
		console.log(error);
		return {
			message: "error",
		};
	}
}
